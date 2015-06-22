<?php
namespace Recognize\AdminThemeBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use Recognize\AdminThemeBundle\Utils\FOSFeedback;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;


class FOSEventListener implements EventSubscriberInterface {

    private $session;

    public function __construct(\Twig_Environment $twig, Session $session) {
        $this->twig = $twig;
        $this->session = $session;
    }

    public function onLoggedIn(){
        $this->session->getFlashBag()->set( FOSFeedback::LOGIN_FEEDBACK_VALUE , 1);
        $this->session->save();
    }

    public static function getSubscribedEvents() {
        return array(
            'security.interactive_login' => array('onLoggedIn', 0)
        );
    }
}