# Decoupled Drupal with GraphQL and React

## Prerequisites

- AmazeeIO (http://docs.amazee.io)
- Composer (http://getcomposer.org)
- Yarn (http://yarnpkg.com)
- Node (http://nodejs.org)

## Usage

First, you need to clone this repository.

```
git clone git@github.com:fubhy/drupal-decoupled-app
```

Then, you need to install the dependencies.

```
cd backend && composer install
cd frontend && yarn install
```

Then, you need to boot the backend container.

```
docker-compose up -d
docker-compose exec --user drupal drupal bash
```

Once connected to the container, you can now install Drupal.

```
drush si -y --account-name=admin --account-pass=admin
```

Now you can create some content (basic page or article) and run the frontend application.

```
yarn run dev
```

Navigating to http://localhost:3000 should present you with a paginated list of articles
and by navigation to the path of one of the nodes (basic page or article) you just
created, you should see a simple teaser of that node.


### Development mode

```
yarn run dev
```

### Production mode

```
yarn run build && yarn run start
```

## License

This project is licensed under the MIT license, Copyright (c) 2016 Sebastian Siemssen. For more information see LICENSE.md.
