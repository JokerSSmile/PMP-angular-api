<?php
namespace AppBundle\Controller\Authorization;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

class SecurityController extends FOSRestController
{
    /**
     * @Rest\Get("/api/login", name="login")
     */
    public function loginAction(Request $request)
    {
        $helper = $this->get('security.authentication_utils');
        $data = array(
            'last_username' => $helper->getLastUsername(),
            'error' => $helper->getLastAuthenticationError()
        );
        $view = $this->view($data, 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/login_check", name="security_login_check")
     */
    public function loginCheckAction()
    {
    }

    /**
     * @Rest\Get("/api/logout", name="logout")
     */
    public function logoutAction()
    {
    }
}