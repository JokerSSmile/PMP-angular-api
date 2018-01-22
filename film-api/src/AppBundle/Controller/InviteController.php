<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Invite;
use AppBundle\Entity\Film;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

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

        $em = $this->getDoctrine()->getManager();

        $userFrom = $this->getDoctrine()->getRepository(User::class)->find($fromId);
        $userTo = $this->getDoctrine()->getRepository(User::class)->find($toId);
        $film = $this->getDoctrine()->getRepository(Film::class)->find($filmId);
        $invite = new Invite();
        $invite->setUser($userFrom);
        $invite->setInvitedUser($userTo);
        $invite->setFilm($film);
        $invite->setStatus(0);

        $em->persist($userFrom);
        $em->persist($invite);
        $em->persist($userTo);
        $em->persist($film);

        $em->flush();

        $view = $this->view($invite, 200);
        return $this->handleView($view);
    }
}