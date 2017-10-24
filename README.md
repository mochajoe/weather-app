# weather-App
## What is the Weather App?
 > Returns the Tempurature depending on the ip address of your connection.

 ![weather-app Demo](./weatherAppDemo.gif "weatherApp Demo gif")

## Table of Contents

* [Description](#description)
* [Technology Stack](#technology-stack)
* [Installation](#installation)
* [Operation](#operation)
* [Testing](#testing)


## Description

Upon launching the index.html file, the initalize method is called.  Initialize contains a method, getCity. The getCity function uses fetch on the weatherapp api and return a json fie that contains the City Name, Longitude, and Latitude.  That information is passed on to the locationObj global constant.

It then calls the getLocation method with the locationObj.  This performs a fetch and uses the Longitude and Latitude to return the Temperature in Kelvin, Weather Condition, the Weather Icon, and the String "CURRENT CONDITIONS FOR:".

After all of the information is passed through regarding the weather, the renderToDom method is called, rending the locationText, location, tempurature, weather condition, and a function that allows the user to toggle between Fehrenheit and Celcius.

This uses many help functions such as displayToDom, which takes in an ID tag name and html to render to the DOM or capitalizeEachFirstLetterOfEachWord which takes a string and returns a new string with each first letter of each word Capitalized.

## Technology Stack

 * This is written all with Vanilla JS!
 * Testing Consists of Mocha/Chai

## Installation

#### Environment dependencies

#### Clone project
Clone repo from github:
```sh
# run git clone
git clone https://github.com/mochajoe/weather-app.git
```

#### Project dependencies

Install project dependencies for testing:
```sh
# run install script
npm install
```

## Operation

Open index.html
```sh
# double click on index.html
open the index.html with your browser
```


## Testing

### Please remember to run npm install on the home directory before opening up the test file.
```sh
# run the testrunner.html file
Open the testrunner.html in a browser
```
