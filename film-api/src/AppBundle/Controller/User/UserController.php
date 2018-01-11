<?php

namespace AppBundle\Controller\User;

use AppBundle\Entity\User;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

class UserController extends FOSRestController
{
    /**
     * @Rest\Get("/api/login")
     */
    public function loginAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();

        if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        } else {
            $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
            $session->remove(SecurityContext::AUTHENTICATION_ERROR);
        }

        // Add the following lines
        if ($session->has('_security.target_path')) {
            if (false !== strpos($session->get('_security.target_path'), $this->generateUrl('fos_oauth_server_authorize'))) {
                $session->set('_fos_oauth_server.ensure_logout', true);
            }
        }

        $view = $this->view($session, 200);

        return $this->handleView($view);
    }

    /**
     * @Rest\Post("/api/register")
     */
    public function registerAction(Request $request)
    {
        //$registerRequest = $request->getContent();
        $form = $this->createForm(
            new User()
        );
        $form->handleRequest($request);

        $test="kee";
        if ($form->isValid()) {
            $test = $form->getData();
            return $test;
        }

        $view = $this->view($test, 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/get-user")
     */
    public function getCurrentUserAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        if ($user == "anon.") {
            $user = null;
        }

        $view = $this->view($user, 200);

        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/get-user-profile/{id}")
     */
    public function getUserAction($id)
    {
        $data = $this->getDoctrine()->getRepository(User::class)->find($id);
        $view = $this->view($data, 200);

        return $this->handleView($view);
    }

    /**
     * @Rest\Post("/api/add-user")
     */
    public function postAction(Request $request)
    {
        $data = new User;
        $name = $request->get('name');
        $role = $request->get('role');
        if(empty($name) || empty($role)) {
            return new View("NULL VALUES ARE NOT ALLOWED", Response::HTTP_NOT_ACCEPTABLE);
        }
        $data->setName($name);
        $data->setRole($role);
        $em = $this->getDoctrine()->getManager();
        $em->persist($data);
        $em->flush();

        return new View("User Added Successfully", Response::HTTP_OK);
    }
}