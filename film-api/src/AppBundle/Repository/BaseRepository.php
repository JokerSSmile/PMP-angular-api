<?php
namespace AppBundle\Repository;

use Doctrine\ORM\EntityManager;

class BaseRepository extends \Doctrine\ORM\EntityRepository
{
    protected function getConnection()
    {
        return $this->getEntityManager()->getConnection();
    }
}