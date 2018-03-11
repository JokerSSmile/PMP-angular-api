<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Invite;
use AppBundle\Entity\Film;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class HistoryController extends BaseController
{
    /**
     * @Rest\Get("/api/get-history/{id}")
     */
    public function getHistoryAction($id)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);

        if (!empty($user)) {
            $responseCode = 200;
            $data = array_merge($user->getSelfHistory()->toArray(), $user->getPartnerHistory()->toArray());
        } else {
            $responseCode = 404;
        }

        return $this->getView($data, $responseCode, 'default');
    }
}