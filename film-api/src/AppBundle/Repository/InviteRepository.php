<?php
namespace AppBundle\Repository;

use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use AppBundle\Entity\Invite;
use AppBundle\Entity\History;
use Doctrine\ORM\EntityManager;

class InviteRepository extends BaseRepository
{
    public function invite($fromUserId, $toUserId, $filmId)
    {
        $sql = 'INSERT INTO invite (id, user_id, invited_user_id, film_id, status, date) VALUES (NULL, :fromUserId, :toUserId, :filmId, 0, UTC_TIMESTAMP())';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['fromUserId' => $fromUserId, 'toUserId' => $toUserId, 'filmId' => $filmId]);
    }

    public function removeInvite($fromUserId, $toUserId, $filmId)
    {
        $sql = 'DELETE FROM invite WHERE user_id = :fromUserId AND invited_user_id = :toUserId AND film_id = :filmId';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['fromUserId' => $fromUserId, 'toUserId' => $toUserId, 'filmId' => $filmId]);
    }

    public function setInviteStatus($inviteId, $status)
    {
        $em = $this->getEntityManager();
        $invite = $em->getRepository(Invite::Class)->find($inviteId);
        if ($status = 1) {
            $historyRepository = $em->getRepository(History::Class);
            $historyRepository->createHistoryItem($invite->getUser()->getId(), $invite->getInvitedUser()->getId(), $invite->getFilm()->getId());
            $em->remove($invite);
            $em->flush();
        }

        $sql = 'UPDATE invite SET status = :status WHERE id = :inviteId';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['inviteId' => $inviteId, 'status' => $status]);
    }

    public function getUserInvites($userId)
    {
        $sql = 'SELECT * FROM invite WHERE user_id = :userId OR invited_user_id = :userId';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['userId' => $userId]);

        return $stmt->fetchAll();
    }
}