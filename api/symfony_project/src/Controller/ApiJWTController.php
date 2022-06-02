<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiJWTController extends AbstractController
{
    private $jwtKey;

    public function __construct($jwt_key)
    {
        $this->jwtKey = $jwt_key;
    }


    public function createJWT($user): string {


        return JWT::encode($user, $this->jwtKey, 'HS256');
    }

    public function verifyJWT($jwt) {
        try {
            return JWT::decode($jwt, new Key($this->jwtKey, 'HS256'));
        } catch (\Exception $e) {
            return new JsonResponse([
                "status" => "error",
                "message" => $e->getMessage()
            ], 401);
        }
    }
}