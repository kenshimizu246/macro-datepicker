import moment from 'moment';

const MockDate = require('mockdate');

import {isBz, m2d} from './utils';

const t2zero = (v) => {
  if(moment.isMoment(v)){
    const t = v;
    t.set('millisecond', 0);
    t.set('second', 0);
    t.set('minute',0);
    t.set('hour',0);
    return t;
  }
  return v;
}

const isBzJp = (v) => {
	if(!isBz(v)){
		return false;
	}

  const fmt = "MM/DD/YYYY";
  let holidays = {};
  holidays["01/01/2019"] = moment("01/01/2019", fmt);
  holidays["01/14/2019"] = moment("01/14/2019", fmt);
  holidays["02/11/2019"] = moment("02/11/2019", fmt);
  holidays["03/21/2019"] = moment("03/21/2019", fmt);
  holidays["04/29/2019"] = moment("04/29/2019", fmt);
  holidays["04/30/2019"] = moment("04/30/2019", fmt);
  holidays["05/01/2019"] = moment("05/01/2019", fmt);
  holidays["05/02/2019"] = moment("05/02/2019", fmt);
  holidays["05/03/2019"] = moment("05/03/2019", fmt);
  holidays["05/06/2019"] = moment("05/06/2019", fmt);
  holidays["07/15/2019"] = moment("07/15/2019", fmt);
  holidays["08/12/2019"] = moment("08/12/2019", fmt);
  holidays["09/16/2019"] = moment("09/16/2019", fmt);
  holidays["09/23/2019"] = moment("09/23/2019", fmt);
  holidays["10/14/2019"] = moment("10/14/2019", fmt);
  holidays["10/22/2019"] = moment("10/22/2019", fmt);
  holidays["11/04/2019"] = moment("11/04/2019", fmt);
  holidays["11/23/2019"] = moment("11/23/2019", fmt);

  if(moment.isMoment(v)){
    if(holidays[v.format(fmt)]){
      return false;
    }
  }
	return true;
}

// day normal
test('m2d.2d', () => {
	MockDate.set('04/08/2019');
	let result = m2d("2d", moment(), isBzJp);
	let expected = moment("04/10/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

// day holiday
test('m2d.2d on holiday', () => {
	MockDate.set('04/05/2019');
	let result = m2d("2d", moment(), isBzJp);
	let expected = moment("04/08/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

// normal
test('m2d.2bd', () => {
	MockDate.set('04/05/2019');
	let result = m2d("2bd", moment(), isBzJp);
	let expected = moment("04/09/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

// on holiday
test('m2d.2bd', () => {
	MockDate.set('05/01/2019');
	let result = m2d("2bd", moment(), isBzJp);
	let expected = moment("05/08/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

// 3/24 is Sun, so that it becomes 3/25 MO
test('m2d.1m', () => {
	MockDate.set('02/24/2019');
	let result = m2d("1m", moment(), isBzJp);
	let expected = moment("03/25/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.1m1mo', () => {
	MockDate.set('04/05/2019');
	let result = m2d("1m1mo", moment(), isBzJp);
	let expected = moment("05/07/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.1m2mo', () => {
	MockDate.set('04/05/2019');
	let result = m2d("1m2mo", moment(), isBzJp);
	let expected = moment("05/13/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.3m1', () => {
	MockDate.set('04/05/2019');
	let result = m2d("3m1", moment(), isBzJp);
	let expected = moment("07/01/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.1m1', () => {
	MockDate.set('04/05/2019');
	let result = m2d("1m1", moment(), isBzJp);
	let expected = moment("05/07/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.1m1 noAdj', () => {
	MockDate.set('04/05/2019');
	let result = m2d("1m1 noAdj", moment(), isBzJp);
	let expected = moment("05/05/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.1m31', () => {
	MockDate.set('03/05/2019');
	let result = m2d("1m31", moment(), isBzJp);
	let expected = moment("04/26/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.6m31', () => {
	MockDate.set('03/05/2019');
	let result = m2d("6m31", moment(), isBzJp);
	let expected = moment("09/30/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.2we', () => {
	MockDate.set('04/05/2019');
	let result = m2d("2we", moment(), isBzJp);
	let expected = moment("04/10/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});

test('m2d.3m2su', () => {
	MockDate.set('04/15/2019');
	let result = m2d("3m2su", moment(), isBzJp);
	let expected = moment("07/16/2019", "MM/DD/YYYY");
	expected = t2zero(expected);
	expect(result.format()).toBe(expected.format());
});




















