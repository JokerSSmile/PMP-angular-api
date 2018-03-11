<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\ORM\Entity;
use Doctrine\ORM\EntityRepository;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="AppBundle\Repository\FilmRepository")
 */
class Film
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
    protected $title;

    /**
     * @ORM\Column(type="integer")
     */
    protected $status;

    /**
     * @ORM\Column(type="string", length=1000)
     */
    protected $description;

    /**
     * @ORM\Column(type="integer")
     */
    protected $rating;

    /**
     * @ORM\Column(type="date")
     */
    protected $releaseDate;

    /**
     * @ORM\Column(type="time")
     */
    protected $runningTime;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $imgUrl;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $wideImgUrl;

    /**
     * @ORM\Column(type="integer")
     */
    protected $kinopoiskId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $genres;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $director;

    /**
     * @ORM\Column(type="string", length=500)
     */
    protected $actors;

    /**
     * @ORM\ManyToMany(targetEntity="User", mappedBy="films")
     */
    protected $users;

    /**
     * @ORM\OneToMany(targetEntity="Invite", mappedBy="film")
     */
    private $invites;

    /**
     * @ORM\OneToMany(targetEntity="History", mappedBy="film")
     */
    private $histories;

    public function getId()
    {
        return $this->id;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getRating()
    {
        return $this->rating;
    }

    public function setRating($rating)
    {
        $this->rating = $rating;
    }

    public function getReleaseDate()
    {
        return $this->releaseDate;
    }

    public function setReleaseDate($releaseDate)
    {
        $this->releaseDate = $releaseDate;
    }

    public function getEndDate()
    {
        return $this->endDate;
    }

    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
    }

    public function getRunningTime()
    {
        return $this->runningTime;
    }

    public function setRunningTime($runningTime)
    {
        $this->runningTime = $runningTime;
    }

    public function getImgUrl()
    {
        return $this->imgUrl;
    }

    public function setImgUrl($imgUrl)
    {
        $this->imgUrl = $imgUrl;
    }

    public function getWideImgUrl()
    {
        return $this->wideImgUrl;
    }

    public function setWideImgUrl($wideImgUrl)
    {
        $this->wideImgUrl = $wideImgUrl;
    }

    public function getKinopoiskId()
    {
        return $this->kinopoiskId;
    }

    public function setKinopoiskId($kinopoiskId)
    {
        $this->kinopoiskId = $kinopoiskId;
    }

    public function getGenres()
    {
        return $this->genres;
    }

    public function setGenres($genres)
    {
        $this->genres = $genres;
    }

    public function getDirector()
    {
        return $this->director;
    }

    public function setDirector($director)
    {
        $this->director = $director;
    }

    public function getActors()
    {
        return $this->actors;
    }

    public function setActors($actors)
    {
        $this->actors = $actors;
    }

    public function getUsers()
    {
        return $this->users;
    }

    public function setUsers($users)
    {
        $this->users = $users;
    }

    public function addUser($user)
    {
        $this->users[] = $user;
    }

    public function removeUser($user)
    {
        $this->users->removeElement($user);
    }

    public function getInvites()
    {
        return $this->invites;
    }

    public function setInvites($invites)
    {
        $this->invites = $invites;
    }

    public function __construct()
    {
        $this->users = new \Doctrine\Common\Collections\ArrayCollection();
        $this->invites = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function addInvite(\AppBundle\Entity\Invite $invite)
    {
        $this->invites[] = $invite;

        return $this;
    }

    public function removeInvite(\AppBundle\Entity\Invite $invite)
    {
        $this->invites->removeElement($invite);
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getUsersCount()
    {
        return count($this->users);
    }
}
