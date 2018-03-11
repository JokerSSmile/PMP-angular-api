<?php
namespace AppBundle\Repository;

use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Query\ResultSetMappingBuilder;

class UserRepository extends BaseRepository
{
    public function addUserFilm($userId, $filmId)
    {
        $sql = 'INSERT INTO user_film (user_id, film_id) VALUES (:userId, :filmId)';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['userId' => $userId, 'filmId' => $filmId]);
    }

    public function removeUserFilm($userId, $filmId)
    {
        $sql = 'DELETE FROM user_film WHERE user_id = :userId AND film_id = :filmId';
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->execute(['userId' => $userId, 'filmId' => $filmId]);
    }
}