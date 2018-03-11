<?php

namespace AppBundle\Controller\User;

use AppBundle\Entity\User;
use AppBundle\Service\UserService;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Controller\BaseController;

class UserController extends BaseController
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

        if ($session->has('_security.target_path')) {
            if (false !== strpos($session->get('_security.target_path'), $this->generateUrl('fos_oauth_server_authorize'))) {
                $session->set('_fos_oauth_server.ensure_logout', true);
            }
        }


        return $view = $this->getView($session, 200);
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

        return $view = $this->getView($userData, 200);
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
            return $view = $this->getView(array('isError' => true,'message' => 'Пользователь с таким идентификатором не найден!'), 200);
        } else {
            $this->userService->fillUser($user, $request->request, $userManager);
            return $view = $this->getView(array('isError' => false), 200);
        }
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

        return $this->getView($user, 200, 'default');
    }

    /**
     * @Rest\Get("/api/get-user-profile/{id}")
     */
    public function getUserAction($id)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($id);

        if ($user != null) {
            $responseCode = 200;
        } else {
            $responseCode = 404;
        }

        return $this->getView($user, $responseCode, 'extra');
    }

    /**
     * @Rest\Post("/api/save-settings")
     */
    public function saveSettingsAction(Request $request)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        if ($user == "anon.") {
            return $this->getView(array("isError" => true, "message" => "Для операции необходимо войти в систему!"), 200);
        } else {
            try {
                $user->setFirstName($request->request->get('firstName'));
                $user->setSurname($request->request->get('surname'));
                $user->setAge($request->request->get('age'));
                $user->setGender($request->request->get('gender'));
                $user->setPhone($request->request->get('phone'));
                $this->getDoctrine()->getManager()->flush();

                return $this->getView(array("isError" => false), 200);
            } catch (Exception $ex) {
                return $this->getView(array("isError" => true, "message" => "Ошибка при обновлении пользователя. Данные не сохранены"), 200);
            }
        }
    }
}