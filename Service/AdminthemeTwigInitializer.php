<?php
namespace Recognize\AdminThemeBundle\Service;

use FOS\UserBundle\FOSUserEvents;
use Recognize\AdminThemeBundle\Utils\AdminEventBuilder;
use Recognize\AdminThemeBundle\Utils\FOSFeedback;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class AdminthemeTwigInitializer extends \Twig_Extension {

    protected $twig;
    protected $username;
    protected $leftmenu = null;
    protected $languages = null;
    protected $session = null;

    public function __construct( $config, \Twig_Environment $twig, TokenStorage $storage, Session $session ){
        $this->twig = $twig;

        if( array_key_exists("languages", $config ) ) {
            $this->languages = $config['languages'];
        }

        if( array_key_exists("leftmenu", $config ) ) {
            $this->leftmenu = $config['leftmenu'];
        }

        $this->session = $session;

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

        $globals = $this->checkForFOSFeedback( $globals );


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


    /**
     * Check to see if we have additional feedback gathered from the sessions
     * This is needed because FOSUserBundle does a lot of redirects without letting the user know if everything went alright
     *
     * @param $globals
     * @return array
     */
    protected function checkForFOSFeedback( $globals ){
        if( $this->session != null ){
            if( $this->session->getFlashBag()->get( FOSFeedback::LOGIN_FEEDBACK_VALUE ) != null ){
                $this->session->save();

                $globals['mobile_open_profile'] = 1;
            }

            // Add feedback messages
            $eventbuilder = new AdminEventBuilder();
            $successmessages = $this->session->getFlashBag()->get( "success" );
            if( $successmessages !== null ){
                $this->session->save();
                for( $i = 0, $length = count( $successmessages ); $i < $length; $i++ ){
                    $eventbuilder->addSuccessMessage( $successmessages[$i] );
                }
            }

            $errormessages = $this->session->getFlashBag()->get( "error" );
            if( $errormessages !== null ){
                $this->session->save();
                for( $i = 0, $length = count( $errormessages ); $i < $length; $i++ ){
                    $eventbuilder->addError( $errormessages[$i] );
                }
            }


            $globals['admin_events'] = $eventbuilder->build();
        }

        return $globals;
    }
}