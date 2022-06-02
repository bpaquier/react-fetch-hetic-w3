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
     * @Route("/sign-in")
     * @return Response
     */
    public function signIn()
    {
        return  $this->json(["hello" => "world"]);
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
        } else {
            $payload = [
                'status' => 'not ok',
                'message' => 'missing key'
            ];
        }




        return $this->json($payload);
    }
}