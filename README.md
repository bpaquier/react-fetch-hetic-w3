# react-fetch-hetic-w3
Student project.

Headless application.

Backend scoped in docker:
  - Api in Symfony
  - BDD: maria_db
  - phpmyadmin

Front in react.js

## Launch the project:
 clone project
### Start the api:
  - ```cd api```

  - ```docker compose up -d```
#### Create DB:
  - ```docker exec -it symfony_docker bash```
  - ```cd symfony_project/```
  - ```php bin/console doctrine:database:create```
#### Fill DB:
  - ``` symfony console make:migration``` then enter ```yes```
  - ```php bin/console doctrine:migrations:migrate```
  - ```symfony console doctrine:fixtures:load``` then enter ```yes```


### Start the front:
  - ```cd front```

  - ```npm i```

  - ```npm start```
  - Go on http://localhost:3000/
