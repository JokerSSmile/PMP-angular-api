<?php
namespace AppBundle\Repository;

use AppBundle\Entity\Review;
use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use AppBundle\Entity\Invite;
use Doctrine\ORM\EntityManager;

class ReviewRepository extends BaseRepository
{
    public function createReview($historyId, $senderId, $userId, $rating, $comment)
    {
        $sql = 'INSERT INTO review (id, user_id, rating, comment, sender_id, history_id) VALUES (NULL, :userId, :rating, :comment, :senderId, :historyId)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['userId' => $userId, 'rating' => $rating, 'comment' => $comment, 'senderId' => $senderId, 'historyId' => $historyId]);
    }
}