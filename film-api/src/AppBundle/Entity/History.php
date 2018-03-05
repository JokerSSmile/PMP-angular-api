<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table("history")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\HistoryRepository")
 */
class History
{
    /**
     * @ORM\Id;
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Film", inversedBy="histories")
     */
    protected $film;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="selfHistory")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="partnerHistory")
     */
    private $partner;

    /**
     * @ORM\OneToMany(targetEntity="Review", mappedBy="history")
     * @JMS\Type("Review")
     * @JMS\Groups({"default"})
     */
    private $reviews;

    public function setFilmName($filmName)
    {
        $this->filmName = $nfilmNameame;
    }

    public function getFilmName()
    {
        return $this->filmName;
    }

    public function getId()
    {
        return $this->id;
    }
}
