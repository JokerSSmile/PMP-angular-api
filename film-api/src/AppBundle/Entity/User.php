<?php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * User
 *
 * @ORM\Table("users")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=40, nullable=true)
     */
    protected $firstName;

    /**
     * @ORM\Column(type="string", length=40, nullable=true)
     */
    protected $surname;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $age;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $gender;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    protected $phone;

    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     */
    protected $userImageUrl;

    /**
     * @ORM\OneToMany(targetEntity="Review", mappedBy="user")
     */
    private $reviews;

    /**
     * @ORM\OneToMany(targetEntity="Review", mappedBy="sender")
     */
    private $sentReviews;

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="user")
     * @JMS\Type("Invite")
     * @JMS\Groups({"default"})
     */
    private $invites;

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="invitedUser")
     * @JMS\Type("Invite")
     * @JMS\Groups({"default"})
     */
    private $invitedMe;

    /**
     * @ORM\ManyToMany(targetEntity="Film", inversedBy="users")
     */
    protected $films;

    /**
     * @ORM\OneToMany(targetEntity="History", mappedBy="user")
     * @JMS\Type("History")
     * @JMS\Groups({"default"})
     */
    protected $selfHistory;

    /**
     * @ORM\OneToMany(targetEntity="History", mappedBy="partner")
     * @JMS\Type("History")
     * @JMS\Groups({"default"})
     */
    protected $partnerHistory;

    public function getId()
    {
        return $this->id;
    }

    public function addFilm($film)
    {
        $this->films[] = $film;
    }

    public function removeFilm($film)
    {
        $this->films->removeElement($film);
    }

    public function getAge()
    {
        return $this->age;
    }

    public function setAge($age)
    {
        $this->age = $age;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    public function getSurname()
    {
        return $this->surname;
    }

    public function setSurname($surname)
    {
        $this->surname = $surname;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    public function getInvites()
    {
        return $this->invites;
    }

    public function getInvitedMe()
    {
        return $this->invitedMe;
    }

    public function getSelfHistory()
    {
        return $this->selfHistory;
    }

    public function getPartnerHistory()
    {
        return $this->partnerHistory;
    }

    public function getReviews()
    {
        return $this->reviews;
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getIsAdmin()
    {
        if ($this->roles == null) {
            return false;
        }
        return in_array("ROLE_ADMIN", $this->roles);
    }
}