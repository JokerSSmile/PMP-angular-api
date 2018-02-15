<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Invite;
use AppBundle\Entity\Film;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class InviteController extends FOSRestController
{
    /**
     * @Rest\Post("/api/invite")
     */
    public function inviteAction(Request $request)
    {
        $filmId = $request->request->get('filmId');
        $fromId = $request->request->get('from');
        $toId = $request->request->get('to');

        try {
            $this->getDoctrine()->getRepository(Invite::class)->invite($fromId, $toId, $filmId);
        } catch (UniqueConstraintViolationException $ex) {
            $view = $this->view(array("isError" => true, "message" => "Пользователь уже приглашен на этот фильм!"), 200);
            return $this->handleView($view);
        } catch (Exception $ex) {
            $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
            return $this->handleView($view);
        }

        $view = $this->view(array("isError" => false), 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Post("/api/remove-invite")
     */
    public function removeInviteAction(Request $request)
    {
        $filmId = $request->request->get('filmId');
        $fromId = $request->request->get('from');
        $toId = $request->request->get('to');

        try {
            $this->getDoctrine()->getRepository(Invite::class)->removeInvite($fromId, $toId, $filmId);
        } catch (Exception $ex) {
            $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
            return $this->handleView($view);
        }

        $view = $this->view(array("isError" => false), 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Post("/api/update-invite-status")
     */
    public function rejectInviteAction(Request $request)
    {
        $inviteId = $request->request->get('inviteId');
        $status = $request->request->get('status');

        try {
            $this->getDoctrine()->getRepository(Invite::class)->setInviteStatus($inviteId, $status);
        } catch (Exception $ex) {
            $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
            return $this->handleView($view);
        }

        $view = $this->view(array("isError" => false), 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/invite-test")
     */
    public function getInviteAction()
    {
        // try {
            $view = $this->view($this->getDoctrine()->getRepository(Invite::class)->get1());
        // } catch (Exception $ex) {
        //     $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
        //     return $this->handleView($view);
        // }

        //$view = $this->view(array("isError" => false), 200);
        return $this->handleView($view);
    }
}