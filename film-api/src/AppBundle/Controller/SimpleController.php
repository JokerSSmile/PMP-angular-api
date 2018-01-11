<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class SimpleController extends FOSRestController
{
    /**
     * @Rest\Get("/api/test")
     */
    public function getDemosAction()
    {
        $data = array("hello" => "world");
        $view = $this->view($data, 200);
        return $this->handleView($view);
    }

    /**
     * @Rest\Get("/api/test1")
     */
    public function someAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        $view = $this->view($user, 200);
        return $this->handleView($view);
        // $clientManager = $this->container->get('fos_oauth_server.client_manager.default');
        // $client = $clientManager->createClient();
        // $client->setAllowedGrantTypes(array('token', 'authorization_code', 'refresh_token', 'password'));
        // $clientManager->updateClient($client);
    }

    /**
     * @Rest\Get("/api/create-new-client")
     */
    public function createClientAction()
    {
        // $clientManager = $this->container->get('fos_oauth_server.client_manager.default');
        // $client = $clientManager->createClient();
        // $client->setAllowedGrantTypes(array('token', 'authorization_code', 'refresh_token', 'password'));
        // $clientManager->updateClient($client);
    }
}