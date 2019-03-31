# Wobbly [![Build Status](https://travis-ci.com/Wobbly-App/wobbly-frontend.svg?branch=develop)](https://travis-ci.com/Wobbly-App/wobbly-frontend) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Wobbly-App/wobbly-frontend)](https://dependabot.com) [![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#-contributors) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Wobbly is an app for workplace organizing. See [wobbly.app](https://wobbly.app) for more details.

* [Code of conduct](CODE-OF-CONDUCT.md)
* [Contributing guide](CONTRIBUTING.md)

## 💻 From 0 to Wobbly
* [Install yarn](https://yarnpkg.com/en/docs/install). Yarn is the package manager we use.
* Install TypeScript and Expo: `yarn global add typescript expo-cli`
* Clone this repo: `git clone git@github.com:Wobbly-App/wobbly-frontend.git`
* `cd` into the repo and run `yarn install` to get dependencies
* Run `yarn codegen` to automatically generate the TypeScript typings for our GraphQL client
* Run `yarn start`. You can preview and live reload the app in an Android/iOS emulator or on your device using the Expo app.
  * See the "Connecting to the backend" section below for more details
* Optional: Run `yarn storybook` for a web-based [storybook](https://storybook.js.org) environment

## 🌐 Connecting to the backend
Our [backend](https://github.com/Wobbly-App/graphql-backend) exposes a GraphQL API.
* Running `yarn start` will connect to a local GraphQL backend that you need to have running (see instructions in the backend repo).
* If you want to run the frontend against our remote staging server, use `yarn start --no-dev` instead. This is the quickest way of getting up and running.

## 🔥 Testing
We use [loki](https://loki.js.org/) to run visual regression tests against our storybook. The general workflow for these are:
* Write a story for your component
* `yarn test` 
* If the tests fail due to a visual change, check the contents of [./loki/difference](./loki/difference). If you are happy with all the changes, run `yarn loki approve` to update the reference screens.
* If the test fail on CI and you think they should have passed, check the travis logs for a link to a url hosting diffs between the current and reference snapshots

## ⚙️ Frameworks
* [Expo](https://expo.io)
* [TypeScript](https://www.typescriptlang.org/) and [TSLint](https://palantir.github.io/tslint/)
* [Apollo](https://www.apollographql.com/) for state management
* [Formik](https://jaredpalmer.com/formik) for forms
* [React Navigation](https://reactnavigation.org/) for navigation/routing

## 🧠 Useful tutorials
* [Atomic design](http://bradfrost.com/blog/post/atomic-web-design/)
* [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
* [React Native tutorial](https://facebook.github.io/react-native/docs/tutorial)

## 👩‍👩‍👧‍👦 Contributors

Thanks goes to these people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/1309951?v=4" width="100px;" alt="Tao Bror Bojlén"/><br /><sub><b>Tao Bror Bojlén</b></sub>](https://btao.org)<br />[💻](https://github.com/Wobbly-App/wobbly-frontend/commits?author=brortao "Code") [🚇](#infra-brortao "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-brortao "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/38507954?v=4" width="100px;" alt="John Evans"/><br /><sub><b>John Evans</b></sub>](http://bananananaba.com)<br />[🖋](#content-King-Mob "Content") [💼](#business-King-Mob "Business development") [🤔](#ideas-King-Mob "Ideas, Planning, & Feedback") [👀](#review-King-Mob "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/24790942?v=4" width="100px;" alt="William Pelton"/><br /><sub><b>William Pelton</b></sub>](https://www.icantotallycode.com/)<br />[💻](https://github.com/Wobbly-App/wobbly-frontend/commits?author=runranron "Code") [👀](#review-runranron "Reviewed Pull Requests") | [<img src="https://avatars1.githubusercontent.com/u/361391?v=4" width="100px;" alt="Chris Devereux"/><br /><sub><b>Chris Devereux</b></sub>](http://coderwall.com/chrisdevereux)<br />[💻](https://github.com/Wobbly-App/wobbly-frontend/commits?author=chrisdevereux "Code") [⚠️](https://github.com/Wobbly-App/wobbly-frontend/commits?author=chrisdevereux "Tests") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

🖤 🐈
