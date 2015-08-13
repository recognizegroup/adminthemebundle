<?php
namespace Recognize\AdminThemeBundle\Twig;

class TableFunctions extends \Twig_Extension {

    public function __construct( $container ) {
        $this->container = $container;
    }

    public function getFunctions(){
        return array(
            "table_header" => new \Twig_Function_Method($this, "renderTableHeader", array('is_safe' => array('html')))
        );
    }

    /**
     * Render the table header with all the required input fieldsd
     *
     * @param string $locale
     */
    public function renderTableHeader( $column_name, $title = "", $searchable = false, $sortable = false, $search = null, $sort = null ){
        if( $column_name == "" ){
            throw new \Twig_Error_Runtime( 'You must supply a column name for the table_header function ( table_header("name") )' );
        }

        $twigvalues = array("column_name" => $column_name,
            "title" => $title, "is_searchable" => $searchable, "is_sortable" => $sortable);

        if( $search != null ){
            $twigvalues['search'] = $search;
        }

        if( $sort != null ){
            $twigvalues['sort'] = $sort;
        }

        return $this->container->get('templating')
            ->render(
                "RecognizeAdminThemeBundle::Table/heading.html.twig",
                $twigvalues
            );
    }

    public function getName() {
        return "twig.recognize.adminthemebundle.tablefunctions";
    }
}