<?php

use Recognize\AdminThemeBundle\DependencyInjection\RecognizeAdminThemeExtension;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class RecognizeCMSExtensionTest extends PHPUnit_Framework_TestCase{

    /**
     * @var RecognizeAdminThemeExtension
     */
    private $extension;

    /**
     * Root name of the configuration
     *
     * @var string
     */
    private $root;

    public function setUp() {
        parent::setUp();

        $this->extension = new RecognizeAdminThemeExtension();
        $this->root = "recognize_admin_theme";
    }

    public function testGetConfigWithDefaultValues() {
        $this->extension->load(array(), $container = $this->getContainer());

        $this->assertTrue($container->hasParameter($this->root . ".config"));
        $config = $container->getParameter($this->root . ".config");
    }

    public function getContainer(){
        $container = new ContainerBuilder();
        $container->setParameter('recognize_admin_theme.config', array());
        return $container;
    }
}