# Wordpress Reader Settings

A simple WordPress widget that allows the user to change the typeface, font size and content width of an article. Written in CoffeeScript && CSS.

## Usage

An example widget (currently only in Finnish) is in `widget.html`. Basically, you have to create a specific kind of form in a widget and embed all the code that widget.

The required code files are `settings.js` (compiled from `settings.coffee`) and `style.css`.

## Compilation

The .coffee file can be compiled by running npm and gulp:
```
npm install

gulp
```
