# Proof of Concept for Decoupled Drupal with GraphQL and React

## Prerequisites

- AmazeeIO (http://docs.amazee.io)
- Compose (http://getcomposer.org)
- Yarn (http://yarnpkg.com)
- Node (http://nodejs.org)

## Usage

First, you need to clone this repository.

``
git clone git@github.com:fubhy/drupal-decoupled-app
``

Then, you need to install the dependencies.

``
cd backend && composer install
cd frontend && yarn install
``

Then, you need to boot the backend container.

``
docker-compose up -d
docker-compose exec --user drupal drupal bash
``

Once connected to the container, you can now install Drupal.

``
drush si -y
``

We do not provide any exported config yet and simply install the standard profile. Therefore, you need to manually enable the GraphQL module.

``
drush en graphql graphql_demo
``

Now, you only need to configure the right permission.

``
Navigate to http://decoupled.backend.docker.amazee.io/admin/people/permissions
Allow anonymous users to execute GraphQL queries.
``

Now you can create some content (basic page or article) and run the frontend application.

``
yarn run dev
``

If you navigate to the path of the node you just created, you should see its title.

``
http://localhost:3000/node/1
``


### Development mode

``
yarn run dev
``

### Production mode

``
yarn run build && yarn run start
``

## Thanks

This project is heavily inspired and branched off of the amazing
[React boilerplate](https://github.com/mxstbr/react-boilerplate) by
[Max Stoiber](https://twitter.com/mxstbr)!

## License

This project is licensed under the MIT license, Copyright (c) 2016 Sebastian Siemssen. For more information see LICENSE.md.
