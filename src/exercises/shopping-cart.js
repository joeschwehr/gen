/*
* Shopping Cart Requirements:
* - Before you start, please run `npm run start:api` to start mock API server
* - data for mock APIs come from ./db/db.json
* - There are 2 APIs you need to call:
*     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
*     - http://localhost:4002/products : this will provide a list of products with full details
*
* We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
* product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
* inside table#shopping-cart-tbl as below:
* ID     Item
* 1001   TV
* 1002   iPad
*
* */

const View = {
  init: async () => {
    const tbodyElem = document.getElementById('shopping-cart-tbl').querySelector('tbody');
    tbodyElem.innerHTML = ''; // Clear existing content

    // fetch cart data
    const cartRes = await fetch('http://localhost:4002/cart');
    const cartData = await cartRes.json();

    // fetch product data
    const productRes = await fetch('http://localhost:4002/products');
    const productData = await productRes.json();

    try {
      const cartItems = cartData.map(cartItem => {
        const product = productData.find(product => product.id === cartItem.id);
        return {
          id: cartItem.id,
          name: product.name
        };
      });

      // add cart items to table
      cartItems.forEach(cartItem => {
        const newRow = document.createElement('tr');
        const idTdElem = document.createElement('td');
        const nameTdElem = document.createElement('td');

        idTdElem.textContent = cartItem.id;
        nameTdElem.textContent = cartItem.name;

        newRow.appendChild(idTdElem);
        newRow.appendChild(nameTdElem);
        tbodyElem.appendChild(newRow);
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};

document.addEventListener('DOMContentLoaded', View.init);
