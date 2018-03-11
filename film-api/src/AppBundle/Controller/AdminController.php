<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Film;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\Validator\Constraints\DateTime;

class AdminController extends BaseController
{
    /**
     * @Rest\Post("/api/add-film")
     */
    public function addFilmAction(Request $request)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        if ($user == "anon." || !$user->getIsAdmin()) {
            return $this->getView(null, 500);
        }

        try {
            $em = $this->getDoctrine()->getManager();

            $title = $request->request->get('title');
            $description = $request->request->get('description');
            $releaseDate = $request->request->get('releaseDate');
            $runningTime = $request->request->get('runningTime');
            $img = $request->request->get('img');
            $imgName = $request->request->get('imgName');
            $wideImg = $request->request->get('wideImg');
            $wideImgName = $request->request->get('wideImgName');
            $genres = $request->request->get('genres');
            $director = $request->request->get('director');
            $actors = $request->request->get('actors');
            $kinopoiskId = $request->request->get('kinopoiskId');

            if (empty($title) || empty($description) || empty($releaseDate) || empty($runningTime) || empty($img) || empty($imgName) || empty($wideImg)
                || empty($wideImgName) || empty($genres)|| empty($director) || empty($actors) || empty($kinopoiskId)) {
                    return $this->getView(array("isError" => true, "message" => "Ошибка при создании фильма, проверьте введеные данные"), 200);
            }

            $this->createFile($img, $imgName, false);
            $this->createFile($wideImg, $wideImgName, true);

            $film = new Film();
            $film->setTitle($title);
            $film->setDescription($description);
            $film->setReleaseDate(\DateTime::createFromFormat('Y-m-d', $releaseDate));
            $film->setRunningTime(\DateTime::createFromFormat('G:i', $runningTime));
            $film->setImgUrl($imgName);
            $film->setWideImgUrl($wideImgName);
            $film->setGenres($genres);
            $film->setDirector($director);
            $film->setActors($actors);
            $film->setKinopoiskId($kinopoiskId);
            $film->setStatus(0);
            $film->setRating(0);

            $em->persist($film);
            $em->flush();

            return $this->getView(array("isError" => false), 200);
        } catch (Exception $e) {
            return $this->getView(array("isError" => true, "message" => "Ошибка при создании фильма"), 200);
        }
    }

    private function createFile($img, $filename, $isWide)
    {
        if ($isWide) {
            $path = "assets/images/wide-posters/" . $filename;
        } else {
            $path = "assets/images/posters/" . $filename;
        }

        $ifp = fopen($path, 'wb');
        $data = explode(',', $img);
        fwrite($ifp, base64_decode($data[1]));
        fclose($ifp);
    }
}