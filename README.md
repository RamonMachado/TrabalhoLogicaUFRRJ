# About

In our college "Introduction to Logic" class we were asked to create our own truth table generator. This is a web tool that creates a truth table from a given logic expression string by the user.
This project contains both **backend** and **frontend** project files.

# Backend
It's built with Node.js and Express. 

To intall dependencies, just do:
>npm install

And to run, just do:
>node server.js

The **truthTable** endpoint is where it receives the logic expression and returns a truth table.

## Frontend
It's built using Vue + Vuetify.

To install dependencies, just do:
>npm install

To run, just do:
>npm run serve

## How to get a truth table from our backend using request
If you want to get a table using your application, you can use access our "truthTable" endpoint using a GET request.
