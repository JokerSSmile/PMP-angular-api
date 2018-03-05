<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ReviewRepository")
 */
class Review
{
    /**
     * @ORM\Id;
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="integer")
     */
    protected $rating;

    /**
     * @ORM\Column(type="string", length=500)
     */
    protected $comment;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="reviews")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="sentReviews")
     */
    private $sender;

    /**
     * @ORM\ManyToOne(targetEntity="History", inversedBy="reviews")
     * @JMS\Type("History")
     * @JMS\Groups({"default"})
     */
    private $history;

    public function setRating($rating)
    {
        $this->rating = $rating;
    }

    public function getRating()
    {
        return $this->rating;
    }

    public function setComment($comment)
    {
        $this->comment = $comment;
    }

    public function getComment()
    {
        return $this->comment;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
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
