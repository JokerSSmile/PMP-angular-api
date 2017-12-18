<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
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
     * @ORM\Column(type="string", length=255)
     */
    protected $filmName;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="history")
     */
    private $partner;

    public function setFilmName($filmName)
    {
        $this->filmName = $nfilmNameame;
    }

    public function getFilmName()
    {
        return $this->filmName;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set partner
     *
     * @param \AppBundle\Entity\User $partner
     *
     * @return History
     */
    public function setPartner(\AppBundle\Entity\User $partner = null)
    {
        $this->partner = $partner;

        return $this;
    }

    /**
     * Get partner
     *
     * @return \AppBundle\Entity\User
     */
    public function getPartner()
    {
        return $this->partner;
    }
}
