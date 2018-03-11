<?php

namespace AppBundle\Service;

use AppBundle\Entity\User;

use Symfony\Component\HttpFoundation\Request;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\FOSUserEvents;

class UserService
{
    public function createUser(Request $request, $formFactory, $userManager, $dispatcher)
    {
        $user = $userManager->createUser();
        $user->setEnabled(true);

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);
        $form = $formFactory->createForm([
            'csrf_protection'    => false
        ]);
        $form->setData($user);
        $form->submit($request->request->all());

        if ( !$form->isValid()) {
            return array('isError' => true, 'message' => 'Введите корректные данные!');
        }
        $event = new FormEvent($form, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);
        if ($event->getResponse()) {
            return array('isError' => true, 'message' => 'Ошибка при регистрации пользователя. Повторите снова!');
        }
        $userManager->updateUser($user);

        return array('isError' => false, 'userId' => $user->getId()
        );
    }

    public function fillUser(User $user, $params, $userManager)
    {
        $user->setFirstName($params->get('name'));
        $user->setSurname($params->get('surname'));
        $user->setAge($params->get('age'));
        $user->setGender($params->get('gender'));
        $user->setPhone($params->get('phone'));

        $userManager->updateUser($user);
    }
}