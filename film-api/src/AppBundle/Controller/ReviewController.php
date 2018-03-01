<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Invite;
use AppBundle\Entity\Film;
use AppBundle\Entity\Review;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class ReviewController extends FOSRestController
{
    /**
     * @Rest\Post("/api/add-review")
     */
    public function addReviewAction(Request $request)
    {
        $historyId = $request->request->get('historyId');
        $senderId = $request->request->get('senderId');
        $userId = $request->request->get('userId');
        $rating = $request->request->get('rating');
        $comment = $request->request->get('comment');

        try {
            $this->getDoctrine()->getRepository(Review::class)->createReview($historyId, $senderId, $userId, $rating, $comment);
        } catch (Exception $ex) {
            $view = $this->view(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
            return $this->handleView($view);
        }

        $view = $this->view(array("isError" => false), 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/get-reviews/{id}")
     */
    public function getReviewsAction($id)
    {
        $data = $this->getDoctrine()->getRepository(Review::class)->getUserReviews($id);
        $view = $this->view($data, 200);

        return $this->handleView($view);
    }
}