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
