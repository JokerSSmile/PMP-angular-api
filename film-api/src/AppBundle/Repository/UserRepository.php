<?php
namespace AppBundle\Repository;

use AppBundle\Entity\User;
use AppBundle\Entity\Film;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Query\ResultSetMappingBuilder;

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

    // public function getFilmUsers($filmId)
    // {
    //     // $connection = $this->getEntityManager()->getConnection();
    //     // $sql = 'SELECT * FROM user_film LEFT JOIN users ON users.id = user_film.user_id WHERE film_id = :filmId';
    //     // $sql = 'SELECT * FROM users u WHERE EXISTS (SELECT * FROM user_film uf WHERE uf.film_id = :filmId AND u.id = uf.user_id)';
    //     // $stmt = $connection->prepare($sql);
    //     // $stmt->execute(['filmId' => $filmId]);

    //     // return $stmt->fetchAll();

    //     //$sql = 'SELECT * FROM users u WHERE EXISTS (SELECT * FROM user_film uf WHERE uf.film_id = ? AND u.id = uf.user_id)';
    // }
}