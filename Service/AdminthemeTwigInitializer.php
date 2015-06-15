<?php
namespace Recognize\AdminThemeBundle\Service;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class AdminthemeTwigInitializer extends \Twig_Extension {

    protected $twig;
    protected $username;
    protected $leftmenu = null;
    protected $languages = null;

    public function __construct( $config, \Twig_Environment $twig, TokenStorage $storage ){
        $this->twig = $twig;

        if( array_key_exists("languages", $config ) ) {
            $this->languages = $config['languages'];
        }

        if( array_key_exists("leftmenu", $config ) ) {
            $this->leftmenu = $config['leftmenu'];
        }

        $token = $storage->getToken();
        if( $token != null ){
            $this->username = ucfirst( $token->getUsername() );
        }
    }

    public function getGlobals() {
        $globals = parent::getGlobals();
        $globals['admin_profile_username'] = $this->username;

        if( $this->leftmenu != null ){
            $globals["left_menu_builder"] = $this->leftmenu;
        }

        if( $this->languages != null ){
            $globals['admin_profile_languages'] = $this->languages;
        }

        return $globals;
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