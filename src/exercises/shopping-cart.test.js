import { View, buildTableHTML } from './shopping-cart';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
// export CHROME_PATH=/Applications/Brave\ Browser.app/Contents/MacOS/Brave\ Browser


describe('Shopping Cart', () => {
    afterEach(() => {
        // Restore the original fetch function after each test
        sinon.restore();
    });

    it('should display items in the shopping cart table', async () => {
        // Mock data for cart and products
        const cartData = [{ id: 1001 }, { id: 1002 }];
        const productData = [{ id: 1001, name: 'TV' }, { id: 1002, name: 'iPad' }];

        // intercept fetch calls
        sinon.stub(window, 'fetch');
        window.fetch.onCall(0).resolves({ json: () => cartData });
        window.fetch.onCall(1).resolves({ json: () => productData });

        // Render the component
        const element = await fixture(html`<table id="shopping-cart-tbl" border="1" cellpadding="16px">`);
        element.innerHTML = `<tbody></tbody>`;
        document.body.appendChild(element);

        // Simulate the component initialization
        await View.init();

        // console.log('inner html', element.innerHTML)

        // Access the rendered table content
        const tableContent = element.innerHTML;

        // Check if the table has been updated with the correct content
        expect(tableContent).to.include('<td>1001</td>');
        expect(tableContent).to.include('<td>TV</td>');
        expect(tableContent).to.include('<td>1002</td>');
        expect(tableContent).to.include('<td>iPad</td>');
    });

    it('should handle errors', async () => {
        // intercept fetch calls
        sinon.stub(window, 'fetch');
        window.fetch.onCall(0).rejects(new Error('404'));

        // Render the component
        const element = await fixture(html`<table id="shopping-cart-tbl" border="1" cellpadding="16px">`);
        element.innerHTML = `<tbody></tbody>`;
        document.body.appendChild(element);

        try {
            // Simulate the component initialization
            await View.init();

            // Check if the table has been updated with the correct content
            expect(element.innerHTML).to.equal('<tbody></tbody>');
        } catch (error) {
            expect(element.innerHTML).to.equal('<tbody></tbody>');
            expect(error.message).to.equal('404');
        }
    })

    it('should build table HTML', () => {
        const cartItems = [
            { id: 1001, name: 'TV' },
            { id: 1002, name: 'iPad' }
        ];

        const tableHTML = buildTableHTML(cartItems);

        expect(tableHTML).to.include('<td>1001</td>');
        expect(tableHTML).to.include('<td>TV</td>');
        expect(tableHTML).to.include('<td>1002</td>');
        expect(tableHTML).to.include('<td>iPad</td>');
    });
});