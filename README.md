# Skeleton for Symfony 5 + ReactJS 18

## Stack
- Symfony 5.4
- PHP 7.4 FPM
- Yarn
- ReactJS 18
- Node 18.12.0
- MariaDB 10.2.31

## About docker
This project use my custom private docker configuration.
Please make your own docker configuration for:
- Nginx
- MySQL
- PHP 7.4 FPM
- Yarn
- Node
- Composer
- etc


## About nginx config
Configure your own Nginx server here: https://symfony.com/doc/current/setup/web_server_configuration.html#nginx
And share this conf file using the volume for this project and your custom nginx server.

## Build project && compile
- docker-compose up -d
- docker-compose stop
- composer install
- yarn install
- yarn run dev
- yarn run watch (for watching changes)
- copy/modify .env.dist to .env file
