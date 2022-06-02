<?php

namespace App\DataFixtures;

use App\Factory\PostFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createMany(3);

        PostFactory::createMany(10, function() {
            return ['user' => UserFactory::random()];
        });
        // $product = new Product();
        // $manager->persist($product);

        $manager->flush();
    }
}
