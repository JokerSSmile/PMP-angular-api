<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

class SimpleController extends FOSRestController
{
    /**
     * @Rest\Get("/api/test")
     */
    public function getDemosAction()
    {
        $data = array("hello" => "world");
        $view = $this->view($data, 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/test1")
     */
    public function someAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $view = $this->view($user, 200);
        return $this->handleView($view);
    }
}