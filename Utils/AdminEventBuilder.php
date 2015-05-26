<?php
namespace Recognize\AdminThemeBundle\Utils;

/**
 * Builder that creates an array of admin events
 *
 * Class AdminEventBuilder
 * @package Recognize\AdminThemeBundle\Utils
 */
class AdminEventBuilder {

    private $events = array();

    /**
     * Add a warning message
     *
     * @param string $message
     * @return AdminEventBuilder
     */
    public function addSuccessMessage( $message ){
        return $this->addEvent( $message, "success" );
    }

    /**
     * Add an error message
     *
     * @param string $message
     * @return AdminEventBuilder
     */
    public function addError( $message ){
        return $this->addEvent( $message, "error" );
    }

    /**
     * Add a warning message
     *
     * @param string $message
     * @return AdminEventBuilder
     */
    public function addWarning( $message ){
        return $this->addEvent( $message, "warning" );
    }

    /**
     * Add a simple info message
     *
     * @param string $message
     * @return AdminEventBuilder
     */
    public function addMessage( $message ){
        return $this->addEvent( $message );
    }

    /**
     * Add an admin event that will be displayed above the content
     *
     * @param string $message
     * @param string $type
     * @return $this
     */
    public function addEvent( $message = "", $type = "info"){
        $this->events[] = array( "type" => $type, "message" => $message );
        return $this;
    }

    public function build(){
        return $this->events;
    }

}