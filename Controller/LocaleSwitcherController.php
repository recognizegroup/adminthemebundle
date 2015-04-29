<?php
namespace Recognize\AdminThemeBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class LocaleSwitcherController extends Controller {

    /**
     * @Security("has_role('ROLE_USER')")
     * @Route("/settings/language", name="_admin_set_language")
     */
    public function indexAction( Request $request) {
        $this->get('session')->set('_locale', $request->get('locale'));

        // Redirect back
        $referer = $request->headers->get('referer');
        return new RedirectResponse($referer);
    }

}