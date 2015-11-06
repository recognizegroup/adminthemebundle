<?php
namespace Recognize\AdminThemeBundle\Twig;

class TableFunctions extends \Twig_Extension {

    public function __construct( $container ) {
        $this->container = $container;
    }

    public function getFunctions(){
        return array(
            "sort_header" => new \Twig_Function_Method($this, "renderTableSortHeader", array('is_safe' => array('html'))),
            "search_name" => new \Twig_Function_Method($this, "generateSearchName", array('is_safe' => array('html'))),
            "sort_name" => new \Twig_Function_Method($this, "generateSortName", array('is_safe' => array('html'))),
            "exact_name" => new \Twig_Function_Method($this, "generateExactName", array('is_safe' => array('html')))
        );
    }

    /**
     * Generate a search name field for the generic RequestQueryBuilder
     *
     * @param $column_name
     */
    public function generateSearchName( $column_name ){
        return "search_" . $this->replaceDots( $column_name );
    }

    /**
     * Generate an exact name field for the generic RequestQueryBuilder
     *
     * @param $column_name
     */
    public function generateExactName( $column_name ){
        return "exact_" . $this->replaceDots( $column_name );
    }

    /**
     * Generate a sort name field for the generic RequestQueryBuilder
     *
     * @param $column_name
     */
    public function generateSortName( $column_name ){
        return "sort_" . $this->replaceDots( $column_name );
    }

    /**
     * Replace the dots in the field as double underscores
     * because PHP turns dots in the query parameters as single underscores
     *
     * @param $string
     * @return mixed
     */
    protected function replaceDots( $string ){
        return str_replace(".", "__", $string );
    }



    /**
     * Render the table sorting header
     *
     * @param string $locale
     */
    public function renderTableSortHeader( $column_name, $title = "", $sort = null ){
        if( $column_name == "" ){
            throw new \Twig_Error_Runtime( 'You must supply a column name for the table_header function ( table_header("name") )' );
        }

        $twigvalues = array("column_name" => $column_name,
            "title" => $title);

        if( $sort != null ){
            $twigvalues['sort'] = $sort;
        }

        return $this->container->get('templating')
            ->render(
                "RecognizeAdminThemeBundle::Table/sortheading.html.twig",
                $twigvalues
            );
    }


    public function getName() {
        return "twig.recognize.adminthemebundle.tablefunctions";
    }
}