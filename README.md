# mod19challenge
A budget tracker application that allows for offline access and functionality.

## Description: 
This application is a budget tracking application, where users can add transactions by typing in the name of the transaction and the amount of money the transaction is. Then the user should click on the "Add Funds" or "Subtract Funds" button to either add or subtract money from their total (which is displayed at the top of the screen).

In the middle of the screen, the user can see their previous transactions. And at the bottom of the screen, there is an interactive graph that also shows previous transactions.

![Screenshot of App](/screenshot_of_app.png)

## Functionality
The app uses IndexedDB and service workers to allow the user to add and subtract funds even if the user is not connected to the internet. The information is stored in a cache until the user finds a stable connection. The information is then sent to the program to update all of the transactions that are done offline!


## Dependencies
This application requires the Express.js package to create the routing, and Mongoose package to connect to a MongoDB Database.

## Link to the Deployed Application
To access the deployed application on Heroku: [CLICK HERE!](https://nameless-anchorage-01032.herokuapp.com/)
