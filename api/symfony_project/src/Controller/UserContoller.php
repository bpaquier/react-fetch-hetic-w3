<?php

namespace  App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


class UserContoller extends AbstractController
{
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    /**
     * @Route("/login", name="app_login", methods="POST")
     * @return JsonResponse
     */
    public function Login(EntityManagerInterface $entityManager, ApiJWTController $apiJWTController)
    {
        $user = $this->getUser();
        $userData = $user->getUserInfos();


        $jwt = $apiJWTController->createJWT($userData);

        $resp = [
            "status" => "ok",
            "token" => $jwt,
        ];

        return  new JsonResponse($resp, 200);
    }

    /**
     * @Route ("/register", methods="POST")
     * @return JsonResponse
     */
    public function Register(EntityManagerInterface $entityManager, Request $request) {
        $name = $request->request->get('name');
        $password = $request->request->get('password');
        $email = $request->request->get('email');

        if(isset($name) && isset($password) && isset($email)) {
            $user = new User();
            $user->setName($name);
            $user->setEmail($email);
            $user->setRoles([]);
            $user->setPassword($this->hasher->hashPassword($user, $password));

            $entityManager->persist($user);
            $entityManager->flush();

            $payload = ['status' => 'ok'];
            $status = 200;
        } else {
            $payload = [
                'status' => 'error',
                'message' => 'missing key'
            ];
            $status = 503;
        }




        return $this->json($payload, $status);
    }
}