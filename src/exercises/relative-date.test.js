import { calculateRelativeDate } from './relative-date';
import { expect } from '@open-wc/testing';

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
    }
  ];

  testCases.forEach(({ input, date, expected }) => {
    it(`Today (${input})`, () => {
      const actual = calculateRelativeDate(date).today.toDateString();
      expect(actual).to.equal(expected.today.toDateString());
    });

    it(`Year (${input})`, () => {
      const actual = calculateRelativeDate(date).year;
      expect(actual).to.equal(expected.year);
    });

    it(`Month (${input})`, () => {
      const actual = calculateRelativeDate(date).month;
      expect(actual).to.equal(expected.month);
    });

    it(`Last Month (${input})`, () => {
      const actual = calculateRelativeDate(date).lastMonth;
      expect(actual).to.equal(expected.lastMonth);
    });

    it(`Date (${input})`, () => {
      const actual = calculateRelativeDate(date).date;
      expect(actual).to.equal(expected.date);
    });

    it(`Yesterday (${input})`, () => {
      const actual = calculateRelativeDate(date).yesterday.toDateString();
      expect(actual).to.equal(expected.yesterday.toDateString());
    });

    it(`Start of this week (${input})`, () => {
      const actual = calculateRelativeDate(date).startOfThisWeek.toDateString();
      expect(actual).to.equal(expected.startOfThisWeek.toDateString());
    });

    it(`End of this week (${input})`, () => {
      const actual = calculateRelativeDate(date).endOfThisWeek.toDateString();
      expect(actual).to.equal(expected.endOfThisWeek.toDateString());
    });

    it(`Start of last week (${input})`, () => {
      const actual = calculateRelativeDate(date).startOfLastWeek.toDateString();
      expect(actual).to.equal(expected.startOfLastWeek.toDateString());
    });

    it(`End of last week (${input})`, () => {
      const actual = calculateRelativeDate(date).endOfLastWeek.toDateString();
      expect(actual).to.equal(expected.endOfLastWeek.toDateString());
    });

    it(`Last day of month (${input})`, () => {
      const actual = calculateRelativeDate(date).lastDayOfMonth;
      expect(actual).to.equal(expected.lastDayOfMonth);
    });

    it(`Ten years ago (${input})`, () => {
      const actual = calculateRelativeDate(date).tenYearsago.getFullYear();
      expect(actual).to.equal(expected.tenYearsago);
    });

    it(`Fifty years ago (${input})`, () => {
      const actual = calculateRelativeDate(date).fiftyYearsAgo.getFullYear();
      expect(actual).to.equal(expected.fiftyYearsAgo);
    });

    it(`Hundred years ago (${input})`, () => {
      const actual = calculateRelativeDate(date).hundredYearsAgo.getFullYear();
      expect(actual).to.equal(expected.hundredYearsAgo);
    });

    it(`Thousand years ago (${input})`, () => {
      const actual = calculateRelativeDate(date).thousandYearsAgo.getFullYear();
      expect(actual).to.equal(expected.thousandYearsAgo);
    });

    it(`Two thousand years ago (${input})`, () => {
      const actual = calculateRelativeDate(date).twoThousandYearsAgo.getFullYear();
      expect(actual).to.equal(expected.twoThousandYearsAgo);
    });
  });
});
