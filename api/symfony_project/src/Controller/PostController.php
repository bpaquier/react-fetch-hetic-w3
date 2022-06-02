<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use mysql_xdevapi\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Factory\JsonResponseFactory;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;


/**
 * todo:
 */
class PostController extends AbstractController
{

    /**
     * @Route("/posts")
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     */
    public function getPosts(EntityManagerInterface $entityManager)
    {
        $repository = $entityManager->getRepository(Post::class);

        $posts = $repository->findAll();
        $computedPosts = [];

        foreach ($posts as $post) {
            $computedPosts[] = $post->getPostData();
        }
        return $this->json($computedPosts);
    }

    /**
     * @Route("/newPost", methods="POST")
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse

     */
    public function addPost(EntityManagerInterface $entityManager, Request $request)
    {
        $user = $this->getUser();
        if($user) {
            $title = $request->request->get('title');
            $content = $request->request->get('content');
            if(isset($title) && isset($content)) {
                $post = new Post();
                $post->setTitle($title);
                $post->setContent($content);
                $post->setUser($user);
                $entityManager->persist($post);
                $entityManager->flush();

                $payload = ['status' => 'ok'];
                $status = 200;
            } else{
                $payload = [
                    'status' => 'error',
                    'message' => 'missing key'
                ];
                $status = 503;
            }
        } else {
            $payload= [
                'status' => 'error',
                "message" => "access-denied"
            ];
            $status = 401;
        }



        return $this->json($payload, $status);
    }
}