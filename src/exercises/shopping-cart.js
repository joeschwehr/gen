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

export const View = {
  init: async () => {
    const tbodyElem = document.getElementById('shopping-cart-tbl').querySelector('tbody');
    tbodyElem.innerHTML = ''; // Clear existing content

    // fetch cart data with promise.all
    const [cartRes, productRes] = await Promise.all([
      fetch('http://localhost:4002/cart'),
      fetch('http://localhost:4002/products')
    ]);

    const cartData = await cartRes.json();
    const productData = await productRes.json();

    try {
      // Create a lookup table for product data
      const productLookup = {};
      productData.forEach(product => {
        productLookup[product.id] = product;
      });

      // Map cart data using the lookup table
      const cartItems = cartData.map(cartItem => {
        const product = productLookup[cartItem.id];
        return {
          id: cartItem.id,
          name: product ? product.name : 'Unknown Product'
        };
      });

      // append to table
      const tbodyElem = document.getElementById('shopping-cart-tbl').querySelector('tbody');
      tbodyElem.innerHTML = buildTableHTML(cartItems);

    } catch (error) {
      throw new Error(error);
    }
  }
};

export function buildTableHTML(cartItems) {
  return cartItems.map(cartItem => `
    <tr>
      <td>${cartItem.id}</td>
      <td>${cartItem.name}</td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', View.init);
