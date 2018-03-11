<?php
namespace AppBundle\Controller\Authorization;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Controller\BaseController;

use FOS\RestBundle\Controller\Annotations as Rest;

class SecurityController extends BaseController
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
        $view = $this->getView($data, 200);
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