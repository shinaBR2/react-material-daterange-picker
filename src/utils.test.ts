import * as utils from './utils';

test('test isRangeSameDay with the same startDate and endDate', () => {
  expect(utils.isRangeSameDay({
    startDate: new Date(2019, 7, 21, 0, 0, 0, 0),
    endDate: new Date(2019, 7, 21, 0, 0, 0, 0),
  })).toBe(true);
});

test('test isRangeSameDay with different startDate and endDate', () => {
  expect(utils.isRangeSameDay({
    startDate: new Date(2019, 7, 21, 0, 0, 0, 0),
    endDate: new Date(2019, 2, 21, 0, 0, 0, 0),
  })).toBe(false);
});


