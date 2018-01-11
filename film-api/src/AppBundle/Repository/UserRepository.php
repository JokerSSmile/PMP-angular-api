<?php
namespace AppBundle\Repository;

use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use Doctrine\ORM\EntityManager;

class UserRepository extends \Doctrine\ORM\EntityRepository
{
    public function addUserFilm($userId, $filmId)
    {
        $connection = $this->getEntityManager()->getConnection();

        $sql = 'INSERT INTO user_film (user_id, film_id) VALUES (:userId, :filmId)';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['userId' => $userId, 'filmId' => $filmId]);
    }

    public function removeUserFilm($userId, $filmId)
    {
        $connection = $this->getEntityManager()->getConnection();

        $sql = 'DELETE FROM user_film WHERE user_id = :userId AND film_id = :filmId';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['userId' => $userId, 'filmId' => $filmId]);
    }
}