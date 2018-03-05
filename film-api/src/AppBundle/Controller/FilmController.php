<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Film;
use AppBundle\Entity\User;
use AppBundle\Repository\FilmRepository;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class FilmController extends FOSRestController
{
    /**
     * @Rest\Get("/api/get-films")
     */
    public function getFilmsAction()
    {
        $data = $this->getDoctrine()->getRepository(Film::class)->findAll();

        $view = $this->view($data, 200);
        $context = new Context();
        $context->setGroups(array('default'));
        $view->setContext($context);

        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/get-film/{id}")
     */
    public function getFilmAction($id)
    {
        $data = $this->getDoctrine()->getRepository(Film::class)->find($id);

        $view = $this->view($data, 200);
        $context = new Context();
        $context->setGroups(array('extra'));
        $view->setContext($context);

        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/get-film-users/{id}")
     */
    public function getFilmUsersAction($id)
    {
        $data = $this->getDoctrine()->getRepository(Film::class)->find($id)->getUsers();

        $view = $this->view($data, 200);
        $context = new Context();
        $context->setGroups(array('default'));
        $view->setContext($context);

        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/subscribe")
     */
    public function subscribeAction(Request $request)
    {
        $filmId = $request->query->get('filmId');
        $userId = $request->query->get('userId');

        try {
            $this->getDoctrine()->getRepository(User::class)->addUserFilm($userId, $filmId);
            $view = $this->view(array("isError" => false), 200);
        } catch (UniqueConstraintViolationException $ex) {
            $view = $this->view(array("isError" => true, "message" => "Пользователь уже подписан на этот фильм!"), 500);
        } catch (Exception $ex) {
            $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 500);
        }

        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/unsubscribe")
     */
    public function unsubscribeAction(Request $request)
    {
        $filmId = $request->query->get('filmId');
        $userId = $request->query->get('userId');

        try {
            $this->getDoctrine()->getRepository(User::class)->removeUserFilm($userId, $filmId);
            $view = $this->view(array("isError" => false), 200);
        } catch (Exception $ex) {
            $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 500);
        }

        return $this->handleView($view);
    }
}