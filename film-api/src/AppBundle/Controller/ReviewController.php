<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Entity\Invite;
use AppBundle\Entity\Film;
use AppBundle\Entity\Review;

use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Context\Context;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class ReviewController extends BaseController
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

        if ($historyId == null || $senderId == null || $userId == null || $rating == null) {
            return $this->getView(null, 500);
        }

        try {
            $this->getDoctrine()->getRepository(Review::class)->createReview($historyId, $senderId, $userId, $rating, $comment);
        } catch (Exception $ex) {
            return $this->getView(array("isError" => true, "message" => "Неизвестная ошибка!"), 200);
        }

        return $this->getView(array("isError" => false), 200);
    }

    /**
     * @Rest\Get("/api/get-reviews/{id}")
     */
    public function getReviewsAction($id)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);

        if (empty($user)) {
            $responseCode = 200;
        } else {
            $responseCode = 200;
            $data = $user->getReviews();
        }

        return $this->getView($data, 200, 'default');
    }
}