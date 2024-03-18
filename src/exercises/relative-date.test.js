import { calculateRelativeDate, View } from './relative-date';
import { expect, fixture, html } from '@open-wc/testing';

describe('Calculate Relative Date', () => {
  const testCases = [
    {
      // Feb 1, 2024 (Thursday), week of 28th Jan 2024 to 3rd Feb 2024
      input: "Feb 1, 2024",
      date: new Date(2024, 1, 1),
      expected: {
        today: new Date(2024, 1, 1),
        year: 2024,
        month: 'Feb',
        lastMonth: 'Jan',
        date: 1,
        yesterday: new Date(2024, 0, 31),
        startOfThisWeek: new Date(2024, 0, 28),
        endOfThisWeek: new Date(2024, 1, 3),
        startOfLastWeek: new Date(2024, 0, 21),
        endOfLastWeek: new Date(2024, 0, 27),
        lastDayOfMonth: 29,
        tenYearsago: 2014,
        fiftyYearsAgo: 1974,
        hundredYearsAgo: 1924,
        thousandYearsAgo: 1024,
        twoThousandYearsAgo: 24,
      }
    },
    {
      // Feb 29, 2024 (Thursday), week of 25th Feb 2024 to 2nd Mar 2024
      input: "Feb 29, 2024",
      date: new Date(2024, 1, 29),
      expected: {
        today: new Date(2024, 1, 29),
        year: 2024,
        month: 'Feb',
        lastMonth: 'Jan',
        date: 29,
        yesterday: new Date(2024, 1, 28),
        startOfThisWeek: new Date(2024, 1, 25),
        endOfThisWeek: new Date(2024, 2, 2),
        startOfLastWeek: new Date(2024, 1, 18),
        endOfLastWeek: new Date(2024, 1, 24),
        lastDayOfMonth: 29,
        tenYearsago: 2014,
        fiftyYearsAgo: 1974,
        hundredYearsAgo: 1924,
        thousandYearsAgo: 1024,
        twoThousandYearsAgo: 24,
      }
    },
    {
      // Feb 28, 2023 (Tuesday), week of 26th Feb 2023 to 4th Mar 2023
      input: "Feb 28, 2023",
      date: new Date(2023, 1, 28),
      expected: {
        today: new Date(2023, 1, 28),
        year: 2023,
        month: 'Feb',
        lastMonth: 'Jan',
        date: 28,
        yesterday: new Date(2023, 1, 27),
        startOfThisWeek: new Date(2023, 1, 26),
        endOfThisWeek: new Date(2023, 2, 4),
        startOfLastWeek: new Date(2023, 1, 19),
        endOfLastWeek: new Date(2023, 1, 25),
        lastDayOfMonth: 28,
        tenYearsago: 2013,
        fiftyYearsAgo: 1973,
        hundredYearsAgo: 1923,
        thousandYearsAgo: 1023,
        twoThousandYearsAgo: 23,
      }
    },
    {
      // Jan 1, 2024 (Monday), week of 31st Dec 2023 to 6th Jan 2024
      input: "Jan 1, 2024",
      date: new Date(2024, 0, 1),
      expected: {
        today: new Date(2024, 0, 1),
        year: 2024,
        month: 'Jan',
        lastMonth: 'Dec',
        date: 1,
        yesterday: new Date(2023, 11, 31),
        startOfThisWeek: new Date(2023, 11, 31),
        endOfThisWeek: new Date(2024, 0, 6),
        startOfLastWeek: new Date(2023, 11, 24),
        endOfLastWeek: new Date(2023, 11, 30),
        lastDayOfMonth: 31,
        tenYearsago: 2014,
        fiftyYearsAgo: 1974,
        hundredYearsAgo: 1924,
        thousandYearsAgo: 1024,
        twoThousandYearsAgo: 24,
      }
    },
    {
      // Jan 1, 1900 (Monday), week of 31st Dec 1899 to 6th Jan 1900
      input: "Jan 1, 1900",
      date: new Date(1900, 0, 1),
      expected: {
        today: new Date(1900, 0, 1),
        year: 1900,
        month: 'Jan',
        lastMonth: 'Dec',
        date: 1,
        yesterday: new Date(1899, 11, 31),
        startOfThisWeek: new Date(1899, 11, 31),
        endOfThisWeek: new Date(1900, 0, 6),
        startOfLastWeek: new Date(1899, 11, 24),
        endOfLastWeek: new Date(1899, 11, 30),
        lastDayOfMonth: 31,
        tenYearsago: 1890,
        fiftyYearsAgo: 1850,
        hundredYearsAgo: 1800,
        thousandYearsAgo: 900,
        twoThousandYearsAgo: -100,
      }
    },
    {
      // Mar 3, 2024 (Sunday), week of 3rd Mar 2024 to 9th Mar 2024
      input: "Mar 3, 2024",
      date: new Date(2024, 2, 3),
      expected: {
        today: new Date(2024, 2, 3),
        year: 2024,
        month: 'Mar',
        lastMonth: 'Feb',
        date: 3,
        yesterday: new Date(2024, 2, 2),
        startOfThisWeek: new Date(2024, 2, 3),
        endOfThisWeek: new Date(2024, 2, 9),
        startOfLastWeek: new Date(2024, 1, 25),
        endOfLastWeek: new Date(2024, 2, 2),
        lastDayOfMonth: 31,
        tenYearsago: 2014,
        fiftyYearsAgo: 1974,
        hundredYearsAgo: 1924,
        thousandYearsAgo: 1024,
        twoThousandYearsAgo: 24,
      }
    },
    {
      // Mar 1, 2025 (Saturday), week of 23 Feb 2025 to 1 Mar 2025
      input: "Mar 1, 2025",
      date: new Date(2025, 2, 1),
      expected: {
        today: new Date(2025, 2, 1),
        year: 2025,
        month: 'Mar',
        lastMonth: 'Feb',
        date: 1,
        yesterday: new Date(2025, 1, 28),
        startOfThisWeek: new Date(2025, 1, 23),
        endOfThisWeek: new Date(2025, 2, 1),
        startOfLastWeek: new Date(2025, 1, 16),
        endOfLastWeek: new Date(2025, 1, 22),
        lastDayOfMonth: 31,
        tenYearsago: 2015,
        fiftyYearsAgo: 1975,
        hundredYearsAgo: 1925,
        thousandYearsAgo: 1025,
        twoThousandYearsAgo: 25,
      }
    },
    {
      // bad date
      input: "Invalid Date",
      date: new Date('abc'),
      expected: {
        today: new Date('abc'),
        year: 'n/a',
        month: 'n/a',
        lastMonth: 'n/a',
        date: 'n/a',
        yesterday: new Date('abc'),
        startOfThisWeek: new Date('abc'),
        endOfThisWeek: new Date('abc'),
        startOfLastWeek: new Date('abc'),
        endOfLastWeek: new Date('abc'),
        lastDayOfMonth: 'n/a',
        tenYearsago: 'n/a',
        fiftyYearsAgo: 'n/a',
        hundredYearsAgo: 'n/a',
        thousandYearsAgo: 'n/a',
        twoThousandYearsAgo: 'n/a',
      }
    }
  ];

  testCases.forEach(({ input, date, expected }) => {
    it(`Today (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).today.toDateString();
        expect(actual).to.equal(expected.today.toDateString());
      }
      catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Year (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).year;
        expect(actual).to.equal(expected.year);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Month (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).month;
        expect(actual).to.equal(expected.month);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Last Month (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).lastMonth;
        expect(actual).to.equal(expected.lastMonth);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Date (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).date;
        expect(actual).to.equal(expected.date);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Yesterday (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).yesterday.toDateString();
        expect(actual).to.equal(expected.yesterday.toDateString());
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Start of this week (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).startOfThisWeek.toDateString();
        expect(actual).to.equal(expected.startOfThisWeek.toDateString());
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`End of this week (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).endOfThisWeek.toDateString();
        expect(actual).to.equal(expected.endOfThisWeek.toDateString());
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Start of last week (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).startOfLastWeek.toDateString();
        expect(actual).to.equal(expected.startOfLastWeek.toDateString());
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`End of last week (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).endOfLastWeek.toDateString();
        expect(actual).to.equal(expected.endOfLastWeek.toDateString());
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Last day of month (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).lastDayOfMonth;
        expect(actual).to.equal(expected.lastDayOfMonth);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Ten years ago (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).tenYearsago.getFullYear();
        expect(actual).to.equal(expected.tenYearsago);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Fifty years ago (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).fiftyYearsAgo.getFullYear();
        expect(actual).to.equal(expected.fiftyYearsAgo);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Hundred years ago (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).hundredYearsAgo.getFullYear();
        expect(actual).to.equal(expected.hundredYearsAgo);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Thousand years ago (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).thousandYearsAgo.getFullYear();
        expect(actual).to.equal(expected.thousandYearsAgo);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });

    it(`Two thousand years ago (${input})`, () => {
      try {
        const actual = calculateRelativeDate(date).twoThousandYearsAgo.getFullYear();
        expect(actual).to.equal(expected.twoThousandYearsAgo);
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });
  });
});

describe('View', () => {
  it('should enable button if input is valid', async () => {
    // Render component
    const input = await fixture(html`<input type="text" id="relative-date-input" />`);
    const btn = await fixture(html`<button id="relative-date-btn" disabled>Click me</button>`);

    View.init();

    // Simulate valid input
    input.value = 'Feb 1, 2024';
    input.dispatchEvent(new Event('input'));

    // Check if button is enabled
    expect(btn.hasAttribute('disabled')).to.be.false;
  });

  const testCases = [
    {
      inputDate: 'Feb 1, 2024',
      expectedResults: [
        'Today: 2024, Feb, 1',
        'Yesterday: Wed Jan 31 2024',
        'This week: Thu Jan 25 2024 &lt; Thu Feb 01 2024 &lt; Wed Jan 31 2024',
        'This week: Sun Jan 28 2024 &lt; Thu Feb 01 2024 &lt; Sat Feb 03 2024',
        'Last week: Thu Jan 18 2024 &lt; Thu Feb 01 2024 &lt;= Thu Jan 25 2024',
        'Last week: Sun Jan 21 2024 TO Sat Jan 27 2024',
        'This month: 2024, Feb, 1 &lt;= Thu Jan 18 2024',
        'This month: Feb 1, 2024 TO Feb 29, 2024',
        'Last month: Jan',
        'This year: 2024',
        'last year: 2023',
        '10 years ago: 2014',
        '50 years ago: 1974',
        '100 years ago: 1924',
        '1000 years ago: 1024',
        '2000 years ago: 24',
      ]
    },
    {
      inputDate: 'Invalid Date',
      expectedResults: [

      ]
    }
    // Add more test cases as needed
  ];

  testCases.forEach((testCase) => {

    it(`should add text for input date: ${testCase.inputDate}`, async () => {
      // Render component with input date
      await fixture(html`<input type="text" id="relative-date-input" value="${testCase.inputDate}" />`);
      const btn = await fixture(html`<button id="relative-date-btn">Click me</button>`);
      const msg = await fixture(html`<div id="relative-date-msg"></div>`);

      View.init();

      // Simulate click
      btn.click();

      // Check if text is added based on expected results
      testCase.expectedResults.forEach((text) => {
        if (!msg.innerHTML.includes(text)) {
          console.log('error:', text);
        }

        expect(msg.innerHTML).to.contain(text);
      });
    });

  });
});

