<?php
namespace Recognize\AdminThemeBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;


class FOSEventListener implements EventSubscriberInterface {

    public function __construct(\Twig_Environment $twig, TokenStorage $storage) {
        $this->twig = $twig;
    }

    public function onLoggedIn(){
        $this->twig->addGlobal("admin_profile_image", "http://dreamatico.com/data_images/kitten/kitten-2.jpg");
    }

    public static function getSubscribedEvents() {
        return array(
            'security.interactive_login' => array('onLoggedIn', 0)
        );
    }
}