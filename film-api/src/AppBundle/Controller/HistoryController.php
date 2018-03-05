<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Invite;
use AppBundle\Entity\Film;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class HistoryController extends FOSRestController
{
    /**
     * @Rest\Get("/api/get-history/{id}")
     */
    public function getHistoryAction($id)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        $data = array_merge($user->getSelfHistory()->toArray(), $user->getPartnerHistory()->toArray());

        $view = $this->view($data, 200);
        $context = new Context();
        $context->setGroups(array('default'));
        $view->setContext($context);

        return $this->handleView($view);
    }
}