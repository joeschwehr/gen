import { expect, fixture, html } from '@open-wc/testing';
import { NumericInput } from './numeric-input';

describe('Test Numeric Input', () => {
    it('should have invalid class when input is bad', async () => {
        // Render component
        const el = await fixture(html`<input type="text" class="c-numeric-input" />`);

        NumericInput.init();

        // Simulate invalid input
        el.value = '--';
        el.dispatchEvent(new Event('input'));

        // Check if error class is added
        expect(el.classList.contains('c-numeric-input--error')).to.be.true;

        // error message should be shown
        expect(el.nextElementSibling.textContent).to.equal('invalid input');
    });

    it('should have valid class on-blur when input is good', async () => {
        // Render component
        const el = await fixture(html`<input type="text" class="c-numeric-input" />`);

        NumericInput.init();

        // Simulate valid input
        el.value = '123';
        el.dispatchEvent(new Event('input'));
        el.dispatchEvent(new Event('blur'));

        // Check if valid class is added
        expect(el.classList.contains('c-numeric-input--valid')).to.be.true;
    });

    it('should NOT have valid class when input is good, but no blur', async () => {
        // Render component
        const el = await fixture(html`<input type="text" class="c-numeric-input" />`);

        NumericInput.init();

        // Simulate valid input
        el.value = '123';
        el.dispatchEvent(new Event('input'));

        // Check if valid class is added
        expect(el.classList.contains('c-numeric-input--valid')).to.be.false;
    });

    it('should remove error class on-focus', async () => {
        // Render component
        const el = await fixture(html`<input type="text" class="c-numeric-input c-numeric-input--error" />`);

        NumericInput.init();

        // Simulate invalid input
        el.value = '--123';
        el.dispatchEvent(new Event('input'));
        el.dispatchEvent(new Event('blur'));
        el.dispatchEvent(new Event('focus'));

        // Check if error class is removed
        expect(el.classList.contains('c-numeric-input--error')).to.be.false;
    });

    it('should remove valid class on-focus', async () => {
        // Render component
        const el = await fixture(html`<input type="text" class="c-numeric-input c-numeric-input--valid" />`);

        NumericInput.init();

        // Simulate valid input
        el.value = '123';
        el.dispatchEvent(new Event('input'));
        el.dispatchEvent(new Event('blur'));
        el.dispatchEvent(new Event('focus'));

        // Check if valid class is removed
        expect(el.classList.contains('c-numeric-input--valid')).to.be.false;

        // Simulate numericRegex
        el.value = '123.123';
        el.dispatchEvent(new Event('input'));
        el.dispatchEvent(new Event('blur'));
        el.dispatchEvent(new Event('focus'));

        // Check if valid class is removed
        expect(el.classList.contains('c-numeric-input--valid')).to.be.false;
    });

    const testCases = [
        { input: '01', expected: '1' },
        { input: '.1', expected: '0.1' },
        { input: '1.', expected: '1' },
        { input: '0.', expected: '0' },
        { input: '-01', expected: '-1' },
        { input: '-0', expected: '0' },
        { input: '.-', expected: '.' },
        { input: '123.123.', expected: '123.123' },
        { input: '00', expected: '0' },
    ];

    for (const { input, expected } of testCases) {
        it(`should change ${input} => ${expected} on blur`, async () => {
            // Render component
            const el = await fixture(html`<input type="text" class="c-numeric-input" />`);

            NumericInput.init();

            // Simulate valid input
            el.value = input;
            el.dispatchEvent(new Event('input'));
            el.dispatchEvent(new Event('blur'));

            // Check if value is changed
            expect(el.value).to.equal(expected);
        });
    }
});
