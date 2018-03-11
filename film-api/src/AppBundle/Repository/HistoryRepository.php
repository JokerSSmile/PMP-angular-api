<?php
namespace AppBundle\Repository;

use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use AppBundle\Entity\Invite;
use Doctrine\ORM\EntityManager;

class HistoryRepository extends BaseRepository
{
    public function createHistoryItem($userId, $partnerId, $filmId)
    {
        $sql = 'INSERT INTO history (id, film_id, date, partner_id, user_id) VALUES (NULL, :filmId, UTC_TIMESTAMP(), :partnerId, :userId)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['filmId' => $filmId, 'partnerId' => $partnerId, 'userId' => $userId]);
    }
}