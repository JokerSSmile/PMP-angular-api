<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table("invite")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\InviteRepository")
 */
class Invite
{
    /**
     * @ORM\Id;
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=25)
     */
    protected $status;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $date;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invites")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="invitedMe")
     */
    private $invitedUser;

    /**
     * @ORM\ManyToOne(targetEntity="Film", inversedBy="invites")
     */
    private $film;

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setInvitedUser($invitedUser)
    {
        $this->invitedUser = $invitedUser;
    }

    public function getInvitedUser()
    {
        return $this->invitedUser;
    }

    public function setFilm($film)
    {
        $this->film = $film;
    }

    public function getFilm()
    {
        return $this->film;
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
}
