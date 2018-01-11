<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Film;
use AppBundle\Entity\User;
use AppBundle\Repository\FilmRepository;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
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

        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/get-film/{id}")
     */
    public function getFilmAction($id)
    {
        $data = $this->getDoctrine()->getRepository(Film::class)->find($id);
        $view = $this->view($data, 200);

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
            $view = $this->view(array("isError" => false, "message" => ""), 200);
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
            $view = $this->view(array("isError" => false, "message" => ""), 200);
        } catch (Exception $ex) {
            $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 500);
        }

        return $this->handleView($view);
    }
}