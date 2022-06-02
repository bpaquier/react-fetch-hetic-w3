<?php

namespace App\Security;

use App\Controller\ApiJWTController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class JWTAuthenticator extends AbstractAuthenticator
{
    private $jwtKey;

    public function __construct($jwt_key)
    {
        $this->jwtKey = $jwt_key;
    }

    public function supports(Request $request): ?bool
    {
        if (isset(getallheaders()['Authorization'])) return true;
        return false;

    }

    public function authenticate(Request $request): Passport
    {
        $jwt = getallheaders()['Authorization'];
        $jwtController = new ApiJWTController($this->jwtKey);
        $verifyJwt = $jwtController->verifyJWT($jwt);
        $computedJwtPayload = (array) $verifyJwt;

        $email = isset($computedJwtPayload['email']) ? $computedJwtPayload['email'] : " ";

        return new SelfValidatingPassport(
            new UserBadge($email)
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
            "status" => "error",
            "message" => $exception->getMessage()
        ], 401);
    }

//    public function start(Request $request, AuthenticationException $authException = null): Response
//    {
//        /*
//         * If you would like this class to control what happens when an anonymous user accesses a
//         * protected page (e.g. redirect to /login), uncomment this method and make this class
//         * implement Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface.
//         *
//         * For more details, see https://symfony.com/doc/current/security/experimental_authenticators.html#configuring-the-authentication-entry-point
//         */
//    }
}
