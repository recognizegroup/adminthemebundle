<?php
namespace Recognize\AdminThemeBundle\Tests\Utils;

use Recognize\AdminThemeBundle\Utils\AdminEventBuilder;

class AdminEventBuilderTest extends \PHPUnit_Framework_TestCase {

    public function testEmptyBuild(){
        $builder = new AdminEventBuilder();
        $this->assertEquals(array(), $builder->build());
    }

    public function testAddInfoEvent(){
        $builder = new AdminEventBuilder();
        $builder->addMessage("Simple message");
        $this->assertEquals( $this->getExpectedInfoMessage(), $builder->build());
    }

    public function testAddWarningEvent(){
        $builder = new AdminEventBuilder();
        $builder->addWarning("Warning message");
        $this->assertEquals( $this->getExpectedWarningMessage(), $builder->build());
    }

    public function testAddErrorEvent(){
        $builder = new AdminEventBuilder();
        $builder->addError("Error message");
        $this->assertEquals( $this->getExpectedErrorMessage(), $builder->build());
    }

    public function testAddSuccessEvent(){
        $builder = new AdminEventBuilder();
        $builder->addSuccessMessage("Success message");
        $this->assertEquals( $this->getExpectedSuccessMessage(), $builder->build());
    }

    public function testAddInfoAndWarningMessage(){
        $builder = new AdminEventBuilder();
        $builder->addMessage("Info message")->addWarning("Warning message");
        $this->assertEquals( $this->getExpectedInfoAndWarningMessage(), $builder->build());
    }

    protected function getExpectedInfoMessage(){
        return array( array("type" => "info", "message" => "Simple message") );
    }

    protected function getExpectedWarningMessage(){
        return array( array("type" => "warning", "message" => "Warning message") );
    }

    protected function getExpectedErrorMessage(){
        return array( array("type" => "error", "message" => "Error message") );
    }

    protected function getExpectedSuccessMessage(){
        return array( array("type" => "success", "message" => "Success message") );
    }

    protected function getExpectedInfoAndWarningMessage(){
        return array( array("type" => "info", "message" => "Info message"),
            array("type" => "warning", "message" => "Warning message"));
    }


}