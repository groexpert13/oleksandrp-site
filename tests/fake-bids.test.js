const test = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, '../lib/utils/fake-bids.ts');
const source = fs.readFileSync(tsPath, 'utf8');
const depSrc = fs.readFileSync(path.join(__dirname, '../lib/marketplace-types.ts'), 'utf8');
const depOut = ts.transpileModule(depSrc, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const depTmp = path.join(__dirname, 'marketplace-types.tmp.js');
fs.writeFileSync(depTmp, depOut);
const items = require(depTmp).marketplaceItems;

let compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
compiled = compiled.replace('../marketplace-types', './marketplace-types.tmp');
const tmpPath = path.join(__dirname, 'fake-bids.tmp.js');
fs.writeFileSync(tmpPath, compiled);
const fake = require(tmpPath);
fs.unlinkSync(tmpPath);
fs.unlinkSync(depTmp);

fake.__resetFakeBidData();

test('email pool size and uniqueness', () => {
  const expected = items.length * 5;
  assert.equal(fake.EMAILS.length, expected);
  const set = new Set(fake.EMAILS);
  assert.equal(set.size, expected);
});

test('bid count range', () => {
  const data = fake.getFakeBidData('1');
  assert.ok(data.count >= 1 && data.count <= 5);
});

test('unique emails per session and across offers', () => {
  fake.__resetFakeBidData();
  const ids = ['1', '2', '3', '4', '5'];
  const allEmails = [];
  ids.forEach(id => {
    const d = fake.getFakeBidData(id);
    assert.ok(d.emails.length === d.count);
    const set = new Set(d.emails);
    assert.equal(set.size, d.emails.length);
    allEmails.push(...d.emails);
  });
  const globalSet = new Set(allEmails);
  assert.equal(globalSet.size, allEmails.length);
});

test('mask email formatting', () => {
  const masked = fake.maskEmail('example@gmail.com');
  assert.equal(masked.startsWith('ex'), true);
  assert.equal(masked.endsWith('@gmail.com'), true);
  assert.ok(masked.includes('*'));
});

test('rotation persists per session', () => {
  fake.__resetFakeBidData();
  const first = fake.getFakeBidData('1');
  const second = fake.getFakeBidData('1');
  assert.equal(first.email, second.email);
  assert.deepEqual(first.emails, second.emails);
  fake.__resetFakeBidData();
  const third = fake.getFakeBidData('1');
  assert.notEqual(first.email, third.email);
  assert.notDeepEqual(first.emails, third.emails);
});
