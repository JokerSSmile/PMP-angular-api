<?php

namespace AppBundle\Controller\User;

use AppBundle\Entity\User;
use AppBundle\Service\UserService;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends FOSRestController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

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
     * @Rest\Post("/api/pre-register")
     */
    public function preRegisterAction(Request $request)
    {
        $formFactory = $this->get('fos_user.registration.form.factory');
        $userManager = $this->get('fos_user.user_manager');
        $dispatcher = $this->get('event_dispatcher');

        $userData = $this->userService->createUser($request, $formFactory, $userManager, $dispatcher);

        $view = $this->view($userData, 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Post("/api/register")
     */
    public function registerAction(Request $request)
    {
        $userManager = $this->get('fos_user.user_manager');

        $userId = $request->request->get('id');
        $user = $this->getDoctrine()->getRepository(User::class)->find($userId);

        if ($user == null) {
            $view = $this->view(array(
                'isError' => true,
                'message' => 'Пользователь с таким идентификатором не найден!'
            ), 200);
        } else {
            $this->userService->fillUser($user, $request->request, $userManager);
            $view = $this->view(array(
                'isError' => false,
                'message' => ''
            ), 200);
        }

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
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);
        $view = $this->view($user, 200);

        return $this->handleView($view);
    }
}