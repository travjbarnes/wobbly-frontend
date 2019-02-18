# Wobbly [![Build Status](https://travis-ci.com/Wobbly-App/wobbly-frontend.svg?branch=develop)](https://travis-ci.com/Wobbly-App/wobbly-frontend) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Wobbly-App/wobbly-frontend)](https://dependabot.com)

Wobbly is an app for workplace organizing. See [wobbly.app](https://wobbly.app) for more details.

* [Code of conduct](CODE-OF-CONDUCT.md)
* [Contributing guide](CONTRIBUTING.md)

Frameworks:
* [Expo](https://expo.io)
* [TypeScript](https://www.typescriptlang.org/) and [TSLint](https://palantir.github.io/tslint/)
* [Redux](https://redux.js.org/) for state management
* [Formik](https://jaredpalmer.com/formik) for forms
* [React Navigation](https://reactnavigation.org/) for navigation/routing

Useful tutorials
* [Atomic design](http://bradfrost.com/blog/post/atomic-web-design/)
* [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* [React Native tutorial](https://facebook.github.io/react-native/docs/tutorial)
* [Redux basics](https://redux.js.org/basics)
* [Async actions in Redux](https://redux.js.org/advanced/asyncactions#async-action-creators) (the entire async tutorial is useful)

## From 0 to Wobbly
* [Install yarn](https://yarnpkg.com/en/docs/install). Yarn is the package manager we use.
* Install TypeScript and Expo: `yarn global add typescript expo-cli`
* Clone this repo: `git clone git@github.com:Wobbly-App/wobbly-frontend.git`
* `cd` into the repo and run `yarn install`
* Run `yarn start`. You can preview and live reload the app in an Android/iOS emulator or on your device using the Expo app.

## Connecting to the backend
Our [backend](https://github.com/Wobbly-App/wobbly-backend) is a Django project that exposes a REST API. This API is specified in a [Swagger](https://en.wikipedia.org/wiki/Swagger_(software)) (a.k.a. OpenAPI) schema. From this schema, we generate a TypeScript client using [openapi-generator](https://github.com/OpenAPITools/openapi-generator).

We use version 4.0.0-beta of the generator like so:
```
$ wget http://central.maven.org/maven2/org/openapitools/openapi-generator-cli/4.0.0-beta/openapi-generator-cli-4.0.0-beta.jar
$ java -jar openapi-generator-cli-4.0.0-beta.jar generate -i swagger.yaml -g typescript-fetch -o api
```

