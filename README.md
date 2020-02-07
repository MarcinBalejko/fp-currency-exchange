FP Currency Exchange
====================

Building a currency exchange app with login, register and access control. This project has been divided into two parts and deployed separately to heroku platform.

The first part is the main application where users can register, log in and view currency rates as well as their wallet. Currency rates get updated automatically every 30 seconds. Each user account is saved to MongoDB database.

**Main application heroku link:**
* https://fp-currency-exchange.herokuapp.com/

-----

The second part is self-made REST API that grants access to cantor object's data.

**Second part heroku and github repo links:**
* https://github.com/MarcinBalejko/currency-exchange-rest
* https://currency-exchange-rest.herokuapp.com/

-----
**Tools and technologies used:**

* Node.js / Express
* Mongoose
* Passport
* bcrypt.js
* EJS
* HTML / CSS

-----