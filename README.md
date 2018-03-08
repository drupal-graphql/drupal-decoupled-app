# Decoupled Drupal with GraphQL and React

## Prerequisites

- Docker
- amazee.io/Lagoon local Docker development environment (http://lagoon.readthedocs.io/en/latest/using_lagoon/local_development_environments/)

## Usage

First, you need to clone this repository.

    git clone git@github.com:drupal-graphql/drupal-decoupled-app.git

Then, you need to build the images

    docker-compose build

Then, start the containers:


    docker-compose up -d

Once started, connect to the cli container of Drupal and install Drupal.

    docker-compose exec cli bash
    composer install
    drush si config_installer -y --account-name=admin --account-pass=admin

Now you can create some content (basic page or article) within Drupal at http://drupal-varnish.drupal-decoupled-app.docker.amazee.io

Navigating to http://drupal-decoupled-app.docker.amazee.io should present you with a paginated list of articles
and by navigation to the path of one of the nodes (basic page or article) you just
created, you should see a simple teaser of that node.

## License

This project is licensed under the MIT license, Copyright (c) 2016 Sebastian Siemssen. For more information see LICENSE.md.
