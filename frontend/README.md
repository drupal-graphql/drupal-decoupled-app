# Proof of Concept

## NOTE!

This is a proof of concept and does not actually use Drupal as a backend out of the box.

We'll continue working on the Drupal integration for GraphQL and provide a full-featured
demo once the module is fully Relay-compliant out of the box.

In the meantime, and also as a development practice for the future, you can experiment
with a "fake" GraphQL schema based on a simple MongoDB model.

Once running, you can access GraphiQL at http://localhost:3000/graphql. The app itself
can be accessed at http://localhost:3000.

## Prerequisites

- Docker (http://docker.com)
- Docker Compose (http://docs.docker.com/compose)
- Yarn (http://yarnpkg.com)
- Node (http://nodejs.org)

## Usage

First, you need to clone this repository.

``
git clone git@github.com:fubhy/drupal-decoupled-app
``

Then, you need to install the dependencies.

``
yarn install
``

Now you can run the application.

### Development mode

``
yarn run dev
``

### Production mode

``
yarn run build && yarn run start
``

### Linting

``
yarn run lint
``

### Testing

``
yarn run test
``

## Thanks

This project is heavily inspired and branched off of the amazing
[React boilerplate](https://github.com/mxstbr/react-boilerplate) by
[Max Stoiber](https://twitter.com/mxstbr)!

## License

This project is licensed under the MIT license, Copyright (c) 2016 Sebastian Siemssen. For more information see LICENSE.md.
