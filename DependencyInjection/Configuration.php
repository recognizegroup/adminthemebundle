<?php
namespace Recognize\AdminThemeBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder,
    Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * Class Configuration
 * @package Recognize\AdminThemeBundle\DependencyInjection
 */
class Configuration implements ConfigurationInterface {

    /**
     * {@inheritDoc}
     */
    public function getConfigTreeBuilder() {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('recognize_admintheme');

        $rootNode
            ->children()
                ->arrayNode('languages')
                    ->prototype('scalar')->end()
                ->end()
                ->scalarNode('leftmenu')->end()
                ->scalarNode('themecolor')->end()
                ->scalarNode('default_table_limit')->end()
            ->end()
        ;

        return $treeBuilder;
    }

}