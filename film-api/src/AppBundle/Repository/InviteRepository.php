<?php
namespace AppBundle\Repository;

use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use AppBundle\Entity\Invite;
use AppBundle\Entity\History;
use Doctrine\ORM\EntityManager;

class InviteRepository extends \Doctrine\ORM\EntityRepository
{
    public function invite($fromUserId, $toUserId, $filmId)
    {
        $connection = $this->getEntityManager()->getConnection();

        $sql = 'INSERT INTO invite (id, user_id, invited_user_id, film_id, status, date) VALUES (NULL, :fromUserId, :toUserId, :filmId, 0, UTC_TIMESTAMP())';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['fromUserId' => $fromUserId, 'toUserId' => $toUserId, 'filmId' => $filmId]);
    }

    public function removeInvite($fromUserId, $toUserId, $filmId)
    {
        $connection = $this->getEntityManager()->getConnection();

        $sql = 'DELETE FROM invite WHERE user_id = :fromUserId AND invited_user_id = :toUserId AND film_id = :filmId';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['fromUserId' => $fromUserId, 'toUserId' => $toUserId, 'filmId' => $filmId]);
    }

    public function setInviteStatus($inviteId, $status)
    {
        $em = $this->getEntityManager();
        $connection = $em->getConnection();
        $invite = $em->getRepository(Invite::Class)->find($inviteId);
        if ($status = 1) {
            $historyRepository = $em->getRepository(History::Class);
            $historyRepository->createHistoryItem($invite->getUser()->getId(), $invite->getInvitedUser()->getId(), $invite->getFilm()->getId());
            $em->remove($invite);
            $em->flush();
        }

        $sql = 'UPDATE invite SET status = :status WHERE id = :inviteId';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['inviteId' => $inviteId, 'status' => $status]);
    }

    public function getUserInvites($userId)
    {
        $connection = $this->getEntityManager()->getConnection();
        $sql = 'SELECT * FROM invite WHERE user_id = :userId OR invited_user_id = :userId';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['userId' => $userId]);

        return $stmt->fetchAll();
    }

    // public function get1()
    // {
    //     $connection = $this->getEntityManager()->getConnection();

    //     $sql = 'SELECT * FROM invite WHERE user_id = 1';
    //     $stmt = $connection->prepare($sql);
    //     $stmt->execute();

    //     return $stmt->fetchAll();
    // }
}