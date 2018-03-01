<?php
namespace AppBundle\Repository;

use AppBundle\Entity\Review;
use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use AppBundle\Entity\Invite;
use Doctrine\ORM\EntityManager;

class ReviewRepository extends \Doctrine\ORM\EntityRepository
{
    public function createReview($historyId, $senderId, $userId, $rating, $comment)
    {
        $connection = $this->getEntityManager()->getConnection();

        $sql = 'INSERT INTO review (id, user_id, rating, comment, sender_id, history_id) VALUES (NULL, :userId, :rating, :comment, :senderId, :historyId)';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['userId' => $userId, 'rating' => $rating, 'comment' => $comment, 'senderId' => $senderId, 'historyId' => $historyId]);
    }

    public function getUserReviews($userId)
    {
        $connection = $this->getEntityManager()->getConnection();
        $sql = 'SELECT * FROM review WHERE user_id = :userId';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['userId' => $userId]);

        return $stmt->fetchAll();
    }
}