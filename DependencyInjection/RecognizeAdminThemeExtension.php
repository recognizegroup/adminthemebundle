<?php
namespace Recognize\AdminThemeBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder,
    Symfony\Component\HttpKernel\DependencyInjection\Extension,
    Symfony\Component\Config\FileLocator;

/**
 * Class Recognize\AdminThemeBundle\RecognizeRecoCMSExtension
 * @package Recognize\AdminThemeBundle\DependencyInjection
 * @author Kevin te Raa <k.teraa@recognize.nl>
 */
class RecognizeAdminThemeExtension extends Extension {

    /**
     * @param array $configs
     * @param ContainerBuilder $container
     */
    public function load(array $configs, ContainerBuilder $container) {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $container->setParameter('recognize_admin_theme.config', $config);
    }

    /**
     * @return string
     */
    public function getAlias() {
        return 'recognize_admin_theme';
    }

}
