/*
* Write a function that will take a date and compare with today date and return text:
* - Today: same year, same month, same date
* - Yesterday: date = today - 1
* - This week: today - 7 < date < today - 1
* - Last week: today - 14 < date <= today - 7
* - This month: same year, same month, date <= today - 14 ... ??????? doesn't make sense, does it?
* - Last month: month = current month - 1
* - This year: same year
* - last year: year = current year - 1
* - Long time ago: everything else ??????? I DON'T UNDERSTAND THIS
*
* Lastly, please write a unit test for calculateRelativeDate function
* */

const calculateRelativeDate = (inputDate) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const today = new Date(inputDate);

  const year = today.getFullYear();
  const month = months[today.getMonth()];
  const lastMonth = today.getMonth() - 1 < 0 ? 'Dec' : months[today.getMonth() - 1];
  const date = today.getDate();
  const dayOfWeek = today.getDay();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const thisWeek = new Date(today);
  thisWeek.setDate(today.getDate() - 7);

  const startOfThisWeek = new Date(today);
  startOfThisWeek.setDate(today.getDate() - dayOfWeek);

  const endOfThisWeek = new Date(today);
  endOfThisWeek.setDate(today.getDate() + (6 - dayOfWeek));

  const startOfLastWeek = new Date(today);
  startOfLastWeek.setDate(today.getDate() - dayOfWeek - 7);

  const endOfLastWeek = new Date(today);
  endOfLastWeek.setDate(today.getDate() - dayOfWeek - 1);

  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 14);

  const tenYearsago = new Date(today);
  tenYearsago.setFullYear(today.getFullYear() - 10);

  const fiftyYearsAgo = new Date(today);
  fiftyYearsAgo.setFullYear(today.getFullYear() - 50);

  const hundredYearsAgo = new Date(today);
  hundredYearsAgo.setFullYear(today.getFullYear() - 100);

  const thousandYearsAgo = new Date(today);
  thousandYearsAgo.setFullYear(today.getFullYear() - 1000);

  const twoThousandYearsAgo = new Date(today);
  twoThousandYearsAgo.setFullYear(today.getFullYear() - 2000);

  return {
    today,
    year,
    month,
    date,
    yesterday,
    thisWeek,
    startOfThisWeek,
    endOfThisWeek,
    lastWeek,
    startOfLastWeek,
    endOfLastWeek,
    lastMonth,
    lastDayOfMonth,
    tenYearsago,
    fiftyYearsAgo,
    hundredYearsAgo,
    thousandYearsAgo,
    twoThousandYearsAgo
  };
};

const View = {
  init: () => {
    const inputDateElem = document.getElementById('relative-date-input');
    const btn = document.getElementById('relative-date-btn');

    // enable button if input is valid
    inputDateElem.addEventListener('input', e => {
      if (new Date(e.target.value) !== 'Invalid Date') {
        btn.removeAttribute('disabled');
      } else {
        btn.setAttribute('disabled', true);
      }
    })

    // add text on click
    btn.addEventListener('click', () => {
      const msgElement = document.getElementById('relative-date-msg');
      const inputDateElem = document.getElementById('relative-date-input');
      msgElement.innerHTML = View.appendText(calculateRelativeDate(inputDateElem.value));
      View.fadeIn();
    });
  },

  appendText: (text) => {
    const { today, year, month, date, yesterday, thisWeek, startOfThisWeek, endOfThisWeek,
      lastWeek, startOfLastWeek, endOfLastWeek, lastMonth, lastDayOfMonth, tenYearsago,
      fiftyYearsAgo, hundredYearsAgo, thousandYearsAgo, twoThousandYearsAgo } = text;

    return `
    <p data-testid='Today'>Today: ${year}, ${month}, ${date}</p>
    <p data-testid='Yesterday'>Yesterday: ${yesterday.toDateString()}</p>

    <div>
      <p data-testid='this-week'>
        This week: ${thisWeek.toDateString()} < ${today.toDateString()} < ${yesterday.toDateString()}
          <span class="note text-sm">
            is this really what you're asking for?
          </span>
      </p>
      <p data-testid='this-week'>
        This week: ${startOfThisWeek.toDateString()} < ${today.toDateString()} < ${endOfThisWeek.toDateString()}
          <span class="note text-sm">
            This makes more sense when looking at the calendar.
          </span>
      </p>
    </div>

    <div>
      <p data-testid='last-week'>
        Last week: ${lastWeek.toDateString()} < ${today.toDateString()} <= ${thisWeek.toDateString()}
        <span class="note text-sm">
          is this really what you're asking for?
        </span>
      </p>
      <p data-testid='this-week'>
      Last week: ${startOfLastWeek.toDateString()} TO ${endOfLastWeek.toDateString()}
          <span class="note text-sm">
            This makes more sense when looking at the calendar.
          </span>
      </p>
    </div>
    
    <div>
    <p data-testid='this-month-1'>This month: ${year}, ${month}, ${date} <= ${lastWeek.toDateString()}
      <span class="note text-sm">
        requirements: "date <= today - 14" seems odd
      </span>
    </p>
    <p data-testid='this-month-2'>This month: ${month} ${1}, ${year} TO ${month} ${lastDayOfMonth}, ${year}
    <span class="note text-sm">
      this makes more sense to me
    </span>
    </p>
    </div>

    <p data-testid='last-month'>Last month: ${lastMonth}</p>
    <p data-testid='this-year'>This year: ${year}</p>
    <p data-testid='last-year'>last year: ${year - 1}</p>

    <div>
      <p>Long time ago: everything else 
        <span class="note text-sm">
          Unclear requirements: "long time ago" and "everything else" are vague.
        </span>
      </p>
      <p>
        <span class="note text-sm">These are more clear...</span>
      </p>
      <p data-testid='ten-years-ago'>10 years ago: ${tenYearsago.getFullYear()}</p>
      <p data-testid='fifty-years-ago'>50 years ago: ${fiftyYearsAgo.getFullYear()}</p>
      <p data-testid='onehundred-years-ago'>100 years ago: ${hundredYearsAgo.getFullYear()}</p>
      <p data-testid='onethousand-years-ago'>1000 years ago: ${thousandYearsAgo.getFullYear()}</p>
      <p data-testid='twothousand-years-ago'>2000 years ago: ${twoThousandYearsAgo.getFullYear()}</p>
    </div>
    `;
  },

  // animate text
  fadeIn: () => {
    const tags = document.querySelectorAll('#relative-date-msg p, #relative-date-msg div');

    tags.forEach((tag, i) => {
      setTimeout(() =>
        tag.classList.add('fade-in')
        , 40 * i);
    });
  }
};

document.addEventListener('DOMContentLoaded', View.init);
export { calculateRelativeDate };
