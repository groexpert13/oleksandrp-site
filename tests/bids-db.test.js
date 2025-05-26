const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const src = fs.readFileSync('app/api/bids/route.ts', 'utf8');

test('bid route inserts bid into database', () => {
  assert.ok(/INSERT INTO\s+"?Bid"?/i.test(src), 'Bid insertion SQL missing');
});

test('bid route selects bids from database', () => {
  assert.ok(/SELECT \* FROM \"Bid\"/i.test(src), 'Bid select SQL missing');
});

