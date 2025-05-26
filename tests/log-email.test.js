const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const tsPath = path.join(__dirname, '../lib/utils/log-email.ts');
const source = fs.readFileSync(tsPath, 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const tmpPath = path.join(__dirname, 'log-email.tmp.js');
fs.writeFileSync(tmpPath, compiled);
const { logEmail } = require(tmpPath);
fs.unlinkSync(tmpPath);

test('logEmail issues SQL queries', async () => {
  const calls = [];
  const sql = (...args) => { calls.push({tag: true, args}); return Promise.resolve(); };
  sql.query = (...args) => { calls.push({query: true, args}); return Promise.resolve(); };

  await logEmail(sql, 'bid123', 'item1', 'a@example.com', 'Case 404', 123.45);
  assert.equal(calls.length, 4);
  assert.ok(calls[0].tag);
  assert.ok(calls[1].tag);
  assert.ok(calls[2].tag);
  assert.ok(calls[3].query);
});
