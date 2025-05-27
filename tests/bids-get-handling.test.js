const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const src = fs.readFileSync('app/api/bids/route.ts', 'utf8');

const start = src.indexOf('export async function GET');
const end = src.indexOf('export async function POST');
const getSrc = src.slice(start, end);

test('GET handler has error catch', () => {
  assert.ok(/catch\s*\(/.test(getSrc), 'GET handler should catch errors');
});
