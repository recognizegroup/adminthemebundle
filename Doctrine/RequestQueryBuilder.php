<?php
namespace Recognize\AdminThemeBundle\Doctrine;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request;

class RequestQueryBuilder {

    /** The default maximum amount of rows to retrieve when paginating */
    const DEFAULT_LIMIT = 15;

    /**
     * @var array $available_options        The supported options
     */
    protected $available_options;

    public function __construct( EntityManagerInterface $em, $entity ){
        $this->entity = $entity;
        $this->em = $em;

        $this->available_options = array( "search", "sort", "exact");
    }

    /**
     * Add pagination from the request
     *
     * @param Request $request
     * @param QueryBuilder $builder
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function addPagination( Request $request, \Doctrine\ORM\QueryBuilder $builder ){
        $builder->setMaxResults( $request->get('limit', self::DEFAULT_LIMIT) );
        $builder->setFirstResult( $request->get('offset', 0) );

        return $builder;
    }

    /**
     * Get the count for a specific query
     *
     * @param QueryBuilder $builder
     */
    public function getCountForQuery( \Doctrine\ORM\QueryBuilder $builder ){
        $builder->resetDQLPart("select");
        $builder->resetDQLPart("orderBy");
        $builder->select("COUNT(entity.id)");
        $builder->setMaxResults( null );
        $builder->setFirstResult(0);

        return $builder->getQuery()->getSingleScalarResult();
    }

    /**
     * Collects the query elements from the parameter bag
     * For example: search_name = 'Test' will generate the following container
     * [ "search": [ "name": "Test" ] ]
     *
     * @param ParameterBag $bag
     */
    public function parseParameterBag( ParameterBag $bag ){
        $parameters = $bag->all();

        // Generate a container with all the query options
        $container = array();
        for( $i = 0, $length = count( $this->available_options ); $i < $length; $i++ ) {
            $queryoption = $this->available_options[ $i ];

            // Find keys and values for this specific query option
            $querybucket = array();
            foreach( $parameters as $key => $value ) {
                if (strpos($key, $queryoption . "_", 0) === 0) {

                    $optionlength = strlen( $queryoption ) + 1;
                    $entity_key = substr($key, $optionlength);

                    /** PHP converts the dots in the GET queries to underscores,
                     * so instead double underscores in the request and revert them back to dots
                     */
                    $entity_key = str_replace("__", ".", $entity_key );

                    $querybucket[$entity_key] = $value;
                }
            }

            $container[ $queryoption ] = $querybucket;
        }

        return $container;
    }


    /**
     * Use the container object received from the parameter bag parsing to generate a DQL query builder
     * By default selects the entity object
     *
     * @param $container
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function generateDoctrineQueryBuilder( $container ){
        $qb = $this->em->createQueryBuilder();
        $qb->select("entity");
        $qb->from(get_class( $this->entity ), "entity");

        $join_parts = array();
        $where_queries = array();
        $order_queries = array();
        foreach( $container as $queryoption => $queries ){
            foreach( $queries as $entitykey => $value ){

                // Detect the right joins and values for this search key
                $detectedvalues = $this->detectKeyAndJoins( $entitykey, $queryoption );
                $querykey = $detectedvalues['key'];
                $parameter_key = $detectedvalues['parameter_key'];

                if( $detectedvalues['joins'] > 0 ){
                    foreach( $detectedvalues['joins'] as $alias => $join ){
                        $join_parts[ $alias ] = $join;
                    }
                }

                if( $queryoption == "search" && empty( $value ) == false ) {

                    $where_queries[] = $querykey . ' LIKE :' . $parameter_key;
                    $qb->setParameter($parameter_key, '%' . $value . '%');

                } else if ( $queryoption == "exact" && empty( $value ) == false ) {

                    $where_queries[] = $querykey . ' = :' . $parameter_key;
                    $qb->setParameter($parameter_key , $value);

                } else if ( $queryoption == "sort" ) {
                    if(in_array(strtoupper($value), array('ASC','DESC'))) {
                        $qb->addOrderBy($querykey, $value);
                    }
                }
            }
        }

        if( count( $where_queries ) > 0 ){
            $qb->where( join(" AND ", $where_queries ) );
        }

        /**
         * Add the automatic joins
         */
        foreach( $join_parts as $alias => $join ){
            $qb->leftJoin($join, $alias);
        }

        return $qb;
    }

    /**
     * Use the double underscores in the string to create automatic joins
     * And return the right key and parameter key to use in the DQL query
     *
     * For example: name will need entity.name in a DQL query,
     * While order.name will need a left join with the entity.order, and the DQL query will need order.name
     * in it
     *
     * @param $entitykey
     * @param $queryoption
     * @return
     */
    public function detectKeyAndJoins( $entitykey, $queryoption ){
        $elements = explode(".", $entitykey);

        $keys = array(
            "joins" => array(),
            "key" => "entity." . $elements[0],
            "parameter_key" => $queryoption . "_" . $this->snakeCase( $entitykey ) );

        // Generate the join relations and aliasses that doctrine automatically understands
        if( count( $elements ) > 1 ){
            $joins = array();
            for( $i = 0, $lastjoinelement = count( $elements ) - 1; $i < $lastjoinelement; $i++ ){
                $alias = $elements[ $i ];
                $keys[ "key" ] = $alias . "." . $elements[ $i + 1 ];

                if( $i == 0 ){
                    $relation = "entity." . $elements[ $i ];
                } else {
                    $relation = $elements[ $i - 1 ] . "." . $elements[ $i ];
                }
                $joins[ $alias ] = $relation;
            }

            $keys['joins'] = $joins;
        }

        if( strpos( $elements[0], "$" ) === 0 ){
            $keys[ "key" ] = str_replace("$", "", $elements[0] );
        }

        return $keys;
    }

    /**
     * Turn any string into snake case
     *
     * @param $string
     */
    protected function snakeCase( $string ){
        return strtolower( str_replace( ".", "_", $string) );
    }
}