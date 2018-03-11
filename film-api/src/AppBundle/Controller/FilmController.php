<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Film;
use AppBundle\Entity\User;
use AppBundle\Repository\FilmRepository;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class FilmController extends BaseController
{
    /**
     * @Rest\Get("/api/get-films")
     */
    public function getFilmsAction()
    {
        $data = $this->getDoctrine()->getRepository(Film::class)->findAll();

        return $this->getView($data, 200, 'default');
    }

    /**
     * @Rest\Get("/api/get-film/{id}")
     */
    public function getFilmAction($id)
    {
        $film = $this->getDoctrine()->getRepository(Film::class)->find($id);

        if ($film != null) {
            $responseCode = 200;
        } else {
            $responseCode = 404;
        }

        return $this->getView($film, $responseCode, 'extra');
    }

    /**
     * @Rest\Get("/api/get-film-users/{id}")
     */
    public function getFilmUsersAction($id)
    {
        $film = $this->getDoctrine()->getRepository(Film::class)->find($id);

        if ($film != null) {
            $responseCode = 200;
            $data = $film->getUsers();
        } else {
            $responseCode = 404;
        }

        return $this->getView($data, $responseCode, 'default');
    }

    /**
     * @Rest\Get("/api/subscribe/{filmId}/{userId}")
     */
    public function subscribeAction($filmId, $userId)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($userId);
        $film = $this->getDoctrine()->getRepository(Film::class)->find($filmId);

        if ($film == null || $user == null) {
            $view = $this->getView(null, 404);
        } else {
            try {
                $this->getDoctrine()->getRepository(User::class)->addUserFilm($userId, $filmId);
                return $this->getView(array("isError" => false), 200);
            } catch (UniqueConstraintViolationException $ex) {
                return $this->getView(array("isError" => true, "message" => "Пользователь уже подписан на этот фильм"), 200);
            } catch (Exception $ex) {
                return $this->getView(array("isError" => true, "message" => "Неизвестная ошибка"), 200);
            }
        }
    }

    /**
     * @Rest\Get("/api/unsubscribe/{filmId}/{userId}")
     */
    public function unsubscribeAction($filmId, $userId)
    {
        try {
            $this->getDoctrine()->getRepository(User::class)->removeUserFilm($userId, $filmId);
            return $this->getView(array("isError" => false), 200);
        } catch (Exception $ex) {
            return $this->getView(array("isError" => true, "message" => "Неизвестная ошибка"), 200);
        }
    }
}