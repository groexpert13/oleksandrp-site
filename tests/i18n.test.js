const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const tsPath = path.join(__dirname, '../lib/i18n/translations.ts');
const source = fs.readFileSync(tsPath, 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 } }).outputText;
const tmpPath = path.join(__dirname, 'translations.tmp.js');
fs.writeFileSync(tmpPath, compiled);
const { translations } = require(tmpPath);
fs.unlinkSync(tmpPath);

const langs = ['en', 'uk', 'ru', 'es'];
const keys = ['placeBid', 'bidSuccess', 'auctionEnded'];

test('translations contain auction keys', () => {
  for (const lang of langs) {
    for (const key of keys) {
      assert.ok(translations[lang][key], `missing ${key} for ${lang}`);
    }
  }
});
