<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Context\Context;

class BaseController extends FOSRestController
{
    protected function getView($data, $responseCode, $group = null)
    {
        $view = $this->view($data, $responseCode);

        if (!empty($group) && !empty($data)) {
            $context = new Context();
            $context->setGroups(array($group));
            $view->setContext($context);
        }

        return $this->handleView($view);
    }
}