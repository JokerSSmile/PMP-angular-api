<?php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table("users")
 * @ORM\Entity
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
     * @ORM\Column(type="string", length=40)
     */
    protected $firstName;

    /**
     * @ORM\Column(type="string", length=40)
     */
    protected $surname;

    /**
     * @ORM\Column(type="integer")
     */
    protected $age;

    /**
     * @ORM\Column(type="integer")
     */
    protected $gender;

    /**
     * @ORM\Column(type="string", length=20)
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
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="user")
     */
    private $invites;

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="invitedUser")
     */
    private $invitedMe;

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