# gig-of-bands [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## Project Description
This project is an application that allows performers to find venues to perform at and allows venues to search for bands that are looking for gigs. This website follows the MVC paradigm for its architectural structure. For the model, this website uses Sequelize as the ORM for handling the structure and logic of the database. For the view, this website implements Handlebars.js as a template engine instead of hardcoding the HTML for each of the webpages. For the controller, this website is using Express.js to take input from the user and interact with the model to create and read data from the database. Then it returns the results and displays it to the user via the template engine. This webpage also implements authentication to access certain features. The authentication uses Express-Sessions and cookies to keep users logged in and authorize them to access all of the features.

## Table of Contents
[Screenshot](#screenshot)  
[Live Application](#live-application)  
[Usage](#usage)   
[License](#license)   

## Screenshot
![Alt text](/public/images/readme.png)

## Live Application
https://gig-of-bandz-25bf9a236ebe.herokuapp.com

## Usage
This webopage can be navigated using the buttons at the top of the screen, or by clicking on the performers/venues images. The "Performers" link/image will direct you to a list of performers that are registered to the website, displaying the performer name and their genre(s). The "Venues" link/image will direct you to a list of venues that are registered to the website. Clicking on the "Events" link will bring you to the event list that displays current and upcoming events. To register as a performer or a venue, click the login button at the top, then click "Sign up instead". After selecting the account type, fill out the form and submit it.

## License
MIT License
