# Proof of Concept

## NOTE!

This does not yet use Drupal as a backend. Currently, we are using the GraphQL
SWAPI (StarWars API). We will switch to using a Drupal backend once Relay
support has been added (shortly!).

## Decoupled Drupal with Relay & GraphQL

This is a proof of concept of a decoupled React application using Relay &
GraphQL. The application is built on top of a Drupal backend that uses the
GraphQL module to expose its full content entity hierarchy as a GraphQL schema.

## Bonus

On top of these technologies, this proof of concept also uses server-side
rendering techniques as well as hot-reloading on the client (in development
mode) for ease of development.

## Usage

First, you need to clone this repository.

``
git clone git@github.com:fubhy/drupal-decoupled-app
``

Then, you need to install the dependencies.

``
npm install
``

Then, you need to copy the .env.example file to .env and edit the content if
necessary.

``
cp .env.example .env
``

Now you can run the application.

### Development mode

``
npm run dev
``

### Production mode

``
npm run start
``

### Linting

``
npm run lint
``

### Testing

``
npm run test
``

## Deploying to Heroku

This application is ready for being deployed on heroku. Simply set up the heroku integration for your fork or use the heroku cli toolbelt to deploy it as an app.

## Thanks

This project is heavily inspired and branched off of the amazing
[React boilerplate](https://github.com/mxstbr/react-boilerplate) by
[Max Stoiber](https://twitter.com/mxstbr)!

## License

This project is licensed under the MIT license, Copyright (c) 2016 Sebastian Siemssen. For more information see LICENSE.md.
