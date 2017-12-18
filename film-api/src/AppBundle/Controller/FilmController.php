<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Film;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

class FilmController extends FOSRestController
{
    /**
     * @Rest\Get("/api/get-films")
     */
    public function getFilmsAction()
    {
        $data = $this->getDoctrine()->getRepository(Film::class)->findAll();
        $view = $this->view($data, 200)
            ->setHeaders(array(
                'Access-Control-Allow-Origin' => '*'
            ));

        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/get-film/{id}")
     */
    public function getFilmAction($id)
    {
        $data = $this->getDoctrine()->getRepository(Film::class)->find($id);
        $view = $this->view($data, 200)
            ->setHeaders(array(
                'Access-Control-Allow-Origin' => '*'
            ));

        return $this->handleView($view);
    }
}