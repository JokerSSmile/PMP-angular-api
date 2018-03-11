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

class InviteController extends BaseController
{
    /**
     * @Rest\Post("/api/invite")
     */
    public function inviteAction(Request $request)
    {
        $filmId = $request->request->get('filmId');
        $fromId = $request->request->get('from');
        $toId = $request->request->get('to');

        if ($filmId == null || $fromId == null || $toId == null) {
            return $this->getView(null, 500);
        }

        try {
            $this->getDoctrine()->getRepository(Invite::class)->invite($fromId, $toId, $filmId);
        } catch (UniqueConstraintViolationException $ex) {
            return $this->getView(array("isError" => true, "message" => "Пользователь уже приглашен на этот фильм"), 200);
        } catch (Exception $ex) {
            return $this->getView(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
        }

        return $this->getView(array("isError" => false), 200);
    }

    /**
     * @Rest\Post("/api/remove-invite")
     */
    public function removeInviteAction(Request $request)
    {
        $filmId = $request->request->get('filmId');
        $fromId = $request->request->get('from');
        $toId = $request->request->get('to');

        if ($filmId == null || $fromId == null || $toId == null) {
            return $this->getView(null, 500);
        }

        try {
            $this->getDoctrine()->getRepository(Invite::class)->removeInvite($fromId, $toId, $filmId);
        } catch (Exception $ex) {
            return $this->getView(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
        }

        return $this->getView(array("isError" => false), 200);
    }

    /**
     * @Rest\Post("/api/update-invite-status")
     */
    public function rejectInviteAction(Request $request)
    {
        $inviteId = $request->request->get('inviteId');
        $status = $request->request->get('status');

        if ($inviteId == null || $status == null) {
            return $this->getView(null, 500);
        }

        try {
            $this->getDoctrine()->getRepository(Invite::class)->setInviteStatus($inviteId, $status);
        } catch (Exception $ex) {
            return $this->getView(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
        }

        return $this->getView(array("isError" => false), 200);
    }

    /**
     * @Rest\Get("/api/get-invites/{id}")
     */
    public function getInvitesAction($id)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);

        if (empty($user)) {
            $responseCode = 404;
        } else {
            $responseCode = 200;
            $data = array_merge($user->getInvites()->toArray(), $user->getInvitedMe()->toArray());
        }

        return $this->getView($data, $responseCode, 'default');
    }
}