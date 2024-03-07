# JOE'S NOTES

I believe I've completed all the requirements for this project.  

NUMERIC INPUT
* I'm sanitizing the input so it only accepts numbers
* You can enter multiple dashes or dashes at the end of the input to see the "error" class
* Added input-formatting on blur
* Added "success" class on blur
* Remove red/green classes on focus
* Added CSS file for styles

RELATIVE DATE
* I am assuming the day of the week starts on Sunday
* The requirements for "this week", "last week", and "this month" don't really make sense to me. I believe I've completed these requirements successfully, but I've also added notes to the page along with additional output.
* "Long time ago: everything else" makes no sense to me. I've added additional output here in an effort to satisfy requirements for "Long time ago".
* Units tests have been added for multiple years, leap years, and when tests span two years
* All tests are passing

SHOPPING CART
* Calling both API endpoints and getting data
* In a real app we could add a spinner to the page during fetch
* Data is fetched and output to table


# JS Evaluation

This repo includes a set of tests that can be used to assess the skills of
a candidate for a Web Developer position.


# Installation

for this project we are using: node v18.17.0 (npm v9.6.7) along with below dependencies:

* [json-server](https://www.npmjs.com/package/json-server)
* [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/)
* [@open-wc/testing](https://open-wc.org/docs/testing/helpers/)
* [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/)

# Getting Started
```
npm run start
```
You can then view the app in your browser at
[http://localhost:4001](http://localhost:4001).

Additionally, you can start api-service by running:

```
npm run start:api
```
    
You can then view the API in your browser at
[http://localhost:4002](http://localhost:4002). Available API endpoints:

 * [product](http://localhost:4002/products)
 * [cart](http://localhost:4002/cart)

To set up unit test, file must be named with `.test.js` and can be run by below command:

   ```
   npm run test
   ```

# Exercises
There 3 exercises and instruction is provided in each file:
1) Numeric Input Component (src/exercises/numeric-input.js)
2) Relative Date Util function (src/exercises/relative-date.js and src/exercises/relative-date.test.js)
3) Shopping Cart   (src/exercises/shopping-cart.js)
