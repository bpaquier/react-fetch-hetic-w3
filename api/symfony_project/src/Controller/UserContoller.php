<?php

namespace  App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserContoller extends AbstractController
{

    /**
     * @Route("/sign-in")
     * @return Response
     */
    public function signIn()
    {
        return  $this->json(["hello" => "world"]);
    }

}