# generator-pancakes [![Build Status](https://secure.travis-ci.org/gethuman/generator-pancakes.png?branch=master)](https://travis-ci.org/gethuman/generator-pancakes)

This project contains the yeoman generators for Pancakes. Using these generators you can automatically generate
scaffolding code for a Pancakes project. These are still somewhat a work in progress.

## Usage

Execute these commands in order to gain access to the Pancakes Generator:

```
npm install -g yo
npm install -g generator-pancakes
yo pancakes
```

This will create the initial directory structure and code files for a Pancakes project. Note that with
the main pancakes generator and all subgenerators you can opt to provide all user input as command
line parameters instead of waiting to be prompted. So, for example instead of `yo pancakes` and then
enter the app name when propted you can instead do `yo pancakes appName` where appName is replaced by
the actual name of your app.

## Subgenerators

Once you have an existing Pancakes project, you can use the subgenerators to add new components. You
run each subgenerator through the following command:

```
yo pancakes:{subgenerator name}
```

Where you replace the {subgenerator name} with the name of one of the following subgenerators:

#### subapp

Create a new web app under the /app folder. For example, GetHuman Answers and GetHuman Solutions are
two different web apps (called answers and solutions respectively). There will be a number of default
files added including the main .app.js config file as well as the main layout.

#### ui

This is used to add a new page or partial within a particular web app.

#### util

A simple utility that goes under the /utils directory. By default it will be accessible by the server
and the client, but this can be easily changed.

#### trans

Create a new transformer which is the code used to translate a module in pancakes format into a client
side module.

#### resource

Create a new resource which is really just one big configuration file.

#### adapter

Create a new adapter. For example, mongo.persist.adapter which can be used to persist data to MongoDB.

## License

Copyright (c) 2014 Jeff Whelpley. Licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
