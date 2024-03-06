// ATTN: you can enter multiple negative signs to test the error class
// you can also enter negative sign at the end of the number to test the error class

/*
* Numeric Input Component
*   HTML (initial state): <input type="text" class="c-numeric-input" />
*   Requirement:
*   ✅ should only accept numeric value only such as: 1, 1.2, -5, or 1000
*   ✅ if user enter invalid character/value, HTML should change to this
*       <input type="text" class="c-numeric-input c-numeric-input--error" />
*       <span class="c-numeric-input__error-msg">invalid input</span>
*   ✅ if user enters leading zero, or .  when user moves focus away from the input, it should
*     change to correct format:
*       .1 ==> 0.1 and 01 => 1
*   ✅ if user enter valid value and move focus away from the input HTML should change to this:
*       <input type="text" class="c-numeric-input c-numeric-input--valid" />
*   ✅  if user focus on the input or user clear value from the input,
*     HTML should return to initial stage
*
* ✅ Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
* red or green border to the input
* */

const NumericInput = {
  init: () => {
    document.querySelectorAll('.c-numeric-input').forEach(elem => {
      elem.addEventListener('input', NumericInput.onChange);
      elem.addEventListener('focus', NumericInput.onFocus);
      elem.addEventListener('blur', NumericInput.onBlur);
    });
  },

  onChange: (e) => {
    sanitize(e);
    validate(e);
  },

  onFocus: (e) => {
    //   - if user focus on the input... HTML should return to initial stage
    removeErrorMessage(e);
    e.target.classList.remove('c-numeric-input--valid');

  },

  onBlur: (e) => {
    if (e.target.value !== '') {
      fixFormatting(e);
      validate(e, true);
    }
  }
};

document.addEventListener('DOMContentLoaded', NumericInput.init);

const validate = (e, isBlur = false) => {
  const numericRegex = /^-?\d*\.?\d+$/ // - digit, ., digit
  const incompleteNumericRegex = /^-?\d*\.?$/ // - digit, .

  if (e.target.value === '' ||
    e.target.value === '.' ||
    e.target.value === '-' ||
    incompleteNumericRegex.test(e.target.value)) {
    removeErrorMessage(e);

    if (isBlur) {
      e.target.classList.remove('c-numeric-input--valid');
      // add valid class
      e.target.classList.add('c-numeric-input--valid');
    }
  } else if (!numericRegex.test(e.target.value)) {
    addErrorMessage(e);
  } else {
    removeErrorMessage(e);
  }
}

const sanitize = (e) => {
  // remove invalid characters
  e.target.value = e.target.value.replace(/[^0-9.-]/g, '');

  // no hypen then dot
  if (e.target.value[0] === '-') {
    if (e.target.value[1] === '.')
      e.target.value = e.target.value.slice(0, 1); // first character only
  }

  // no dot then hypen
  if (e.target.value[0] === '.') {
    if (e.target.value[1] === '-')
      e.target.value = e.target.value.slice(0, 1);
  }

  // only one decimal point
  if (e.target.value.includes('.')) {
    if (e.target.value.match(/\./g).length > 1) {
      e.target.value = e.target.value.slice(0, -1); // remove last character
    }
  }

  // COMMENTED TO ALLOW MULTIPLE NEGATIVE SIGNS FOR TESTING
  // only one negative sign
  // if (e.target.value.includes('-')) {
  //   if (e.target.value.match(/-/g).length > 1) {
  //     e.target.value = e.target.value.slice(0, -1);
  //   }
  // }

  // only one leading zero
  if (e.target.value.startsWith('0')) {
    if (e.target.value.length > 1 && e.target.value[1] === '0') {
      e.target.value = e.target.value.slice(0, 1);
    }
  }
}

const addErrorMessage = (e) => {

  // add error class
  e.target.classList.add('c-numeric-input--error');

  // remove valid class if it exists
  e.target.classList.remove('c-numeric-input--valid');

  // check if error message already exists
  const el = document.querySelector('.c-numeric-input__error-msg');

  if (!el) {
    const errorMsg = document.createElement('span');
    errorMsg.classList.add('c-numeric-input__error-msg');
    errorMsg.textContent = 'invalid input';
    e.target.parentNode.appendChild(errorMsg);
  }
}

const removeErrorMessage = (e) => {
  // remove error class
  e.target.classList.remove('c-numeric-input--error');

  // remove error message if it exists
  const el = document.querySelector('.c-numeric-input__error-msg');
  if (el) {
    el.remove();
  }
}

const fixFormatting = (e) => {
  let value = e.srcElement.value;

  // *     change to correct format:
  // *     01 => 1
  if (value.startsWith('0') && value.length > 1 && value[1] !== '.') {
    e.srcElement.value = value.slice(1);
  }

  // *     change to correct format:
  // *       .1 ==> 0.1
  if (value.startsWith('.'))
    e.srcElement.value = '0' + value;
}
