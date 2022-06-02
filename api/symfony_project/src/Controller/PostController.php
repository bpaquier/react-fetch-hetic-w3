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
        $title = $request->request->get('title');
        $content = $request->request->get('content');
        if(isset($title) && isset($content)) {
            $userRepo = $entityManager->getRepository(User::class);
            $user = $userRepo->find(10);

            $post = new Post();
            $post->setTitle($title);
            $post->setContent($content);
            $post->setUser($user);
            $entityManager->persist($post);
            $entityManager->flush();

            $payload = ['status' => 'ok'];
        } else{
            $payload = [
                'status' => 'not ok',
                'message' => 'missing key'
            ];
        }

        return $this->json($payload);
    }
}