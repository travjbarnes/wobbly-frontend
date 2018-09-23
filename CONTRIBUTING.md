# Contributing Guide

## Table of Contents

* [Ways to Contribute](#ways-to-contribute)
* [Quick Start](#quick-start)
* [Detailed Start](#detailed-start)
  * [Tech Requirements](#tech-requirements)
  * [Using Github](#using-github)
  * [Installing the Project](#installing-the-project)
  * [Making Your Changes](#making-your-changes)
* [Project Features](#project-features)
* [Project Details](#project-details)
  * [Entry Point](#entry-point)
  * [Base Configuration](#base-configuration)
  * [File Directories](#file-directories)
  * [Other Useful Files](#other-useful-files)
* [Read our Code of Conduct](CODE-OF-CONDUCT.md)
* [Return to README](README.md)

## Ways to Contribute

* [Submit an Issue](https://github.com/Wobbly-app/wobbly-frontend/issues)
  * Issues can be created in the form of bug reports or helpful suggestions
* Update our documentation
  * If you see anything missing from our [README](README.md) or [CONTRIBUTING](CONTRIBUTING.md) docs that should be included, feel free to add it
* Write more tests
  * [About testing with Jest](https://facebook.github.io/jest/)
  * [About testing with Enzyme](https://github.com/airbnb/enzyme)
* Write more stories to our UI Explorer
  * [About creating stories](https://storybook.js.org/)
* Fix bugs or build new features
  * Please identify what you would like to work on in Github Issues first (so as to prevent duplication of effort)
* Please use the app, and provide us feedback!

## Quick Start

Clone this repo, then
* `yarn install`
* `yarn web` (or `yarn start` to run on iOS/Android)

## Detailed Start

### Tech Requirements

* [yarn](https://yarnpkg.com/en/docs/install)
* A command line interface (such as [Git Bash](https://git-scm.com/downloads) for Windows)

### Using Github

* [Github Basics](https://guides.github.com/activities/hello-world/)
* [Understanding the Git Flow](https://guides.github.com/introduction/flow/)
* [Forking a Repository](https://guides.github.com/activities/forking/)
* [Making a Pull Request](https://yangsu.github.io/pull-request-tutorial/)

### Making Your Changes

* Use the project's [storybook](https://github.com/storybooks/storybook) to visually see the effect that your changes are making
  * To run: `yarn storybook`
* Ensure that your changes don't break any tests
  * To run: `yarn test`
* Ask questions on the project's [Issues](https://github.com/Wobbly-app/wobbly-frontend/issues) page if you run into any problems
* When you're ready, make a [Pull Request](https://yangsu.github.io/pull-request-tutorial) with your suggested changes

## Project structure

#### `/src/App`

The first component called by the app.

#### `/src/assets`

Contains any non-Javascript, non-CSS files that should be processed by Webpack.

This includes images, fonts, and svg files.

#### `/src/components`

Contains the main app code. Most of the main development should occur within this directory.

It is currently sub-divided into an [Atomic-like](http://bradfrost.com/blog/post/atomic-web-design/) file structure.

* `/atoms/` for basic, reusable components
* `/molecules/` reusable combinations of atoms
* `/organisms/` for unique, distinct UI features
* `/screens/` for laying the above components into any given complete UI


#### `/src/util`

Contains useful functions & abstractions.

#### `/.storybook`

Contains the configuration files for [Storybook](https://storybook.js.org/).

Should only be updated when configuring new Storybook addons.


#### `/public`

Includes asset files that should _not_ be processed by Webpack.

This directory should rarely be edited or added to.

#### `/.vscode`

[Workspace settings](https://code.visualstudio.com/docs/getstarted/settings) for the [Visual Studio Code](https://code.visualstudio.com/) editor.

---

Read our [Code of Conduct](CODE-OF-CONDUCT.md).

Return to the [README](README.md).
