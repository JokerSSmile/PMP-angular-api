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
        return $this->createQueryBuilder()
            ->select('u')
            ->from('film', 'f')
            ->leftJoin('f.users u ON u.film_id = f.id')
            ->where('u.film_id = :filmId')
            ->setParameter('filmId', $filmId)
            ->getQuery()
            ->getResult();
    }
}