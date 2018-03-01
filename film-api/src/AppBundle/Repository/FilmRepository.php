<?php
namespace AppBundle\Repository;

use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use AppBundle\Entity\Invite;
use Doctrine\ORM\EntityManager;

class FilmRepository extends \Doctrine\ORM\EntityRepository
{
    public function getFilmUsers($filmId)
    {
        $connection = $this->getEntityManager()->getConnection();
        $sql = 'SELECT * FROM user_film WHERE film_id = :filmId';
        $stmt = $connection->prepare($sql);
        $stmt->execute(['filmId' => $filmId]);

        return $stmt->fetchAll();
    }
}