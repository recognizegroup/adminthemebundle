<?php
namespace Recognize\AdminThemeBundle\Twig;

class TableFunctions extends \Twig_Extension {

    public function __construct( $container ) {
        $this->container = $container;
    }

    public function getFunctions(){
        return array(
            "sort_header" => new \Twig_Function_Method($this, "renderTableSortHeader", array('is_safe' => array('html'))),
        );
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