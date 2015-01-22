generator-pancakes
==================

This project contains the yeoman generators for Pancakes. Using these generators you can automatically generate
scaffolding code for a Pancakes project.

**THIS IS NOT READY FOR PRIME TIME**

As of January, 2015 I am still grinding away on the rest of the framework. The idea is to have this
library so users can easily get started with a new pancakes app, but I likely won't be able to get
this fully funcitonal until after the core functionality is complete (i.e. later this year).


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
