<?php
namespace Recognize\AdminThemeBundle\Service;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class AdminthemeTwigInitializer extends \Twig_Extension {

    protected $twig;

    public function __construct( $config, \Twig_Environment $twig, TokenStorage $storage ){
        $this->twig = $twig;

        if( array_key_exists("languages", $config ) ) {
            $twig->addGlobal("admin_profile_languages", $config['languages']);
        }

        if( array_key_exists("leftmenu", $config ) ) {
            $twig->addGlobal("left_menu_builder", $config['leftmenu']);
        }

        $token = $storage->getToken();
        if( $token != null ){
            $twig->addGlobal("admin_profile_username", ucfirst( $token->getUsername() ) );
        }
    }

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName() {
        return "twig.recognize.admintheme.variables";
    }
}