const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const src = fs.readFileSync('app/marketplace/[slug]/page.tsx', 'utf8');
const start = src.indexOf('const detailedDescriptions');
const end = src.indexOf('};', start);
const objectSource = src.slice(src.indexOf('{', start), end + 1);
let descriptions;
try {
  descriptions = eval('(' + objectSource + ')');
} catch (e) {
  descriptions = null;
}

test('detailedDescriptions parses correctly', () => {
  assert.ok(descriptions, 'could not parse descriptions');
});

test('all languages present for case-404', () => {
  assert.ok(descriptions['case-404'].en);
  assert.ok(descriptions['case-404'].uk);
  assert.ok(descriptions['case-404'].ru);
  assert.ok(descriptions['case-404'].es);
});

