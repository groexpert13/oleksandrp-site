const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

test('vercel config does not define crons', () => {
  assert.ok(!config.crons, 'vercel.json should not contain cron jobs');
});
