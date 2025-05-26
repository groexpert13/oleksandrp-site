const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const tsPath = path.join(__dirname, '../lib/utils/markdown-to-telegram.ts');
const source = fs.readFileSync(tsPath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 }
}).outputText;
const tmpPath = path.join(__dirname, 'markdown-to-telegram.tmp.js');
fs.writeFileSync(tmpPath, compiled);
const { markdownToTelegram } = require(tmpPath);
fs.unlinkSync(tmpPath);

test('bold conversion', () => {
  assert.equal(markdownToTelegram('**bold**'), '*bold*');
  assert.equal(markdownToTelegram('__bold__'), '*bold*');
});

test('italic conversion', () => {
  assert.equal(markdownToTelegram('*italic*'), '_italic_');
  assert.equal(markdownToTelegram('_italic_'), '_italic_');
});

test('strike conversion', () => {
  assert.equal(markdownToTelegram('~~strike~~'), '~strike~');
});

test('inline code unchanged', () => {
  assert.equal(markdownToTelegram('`code`'), '`code`');
});

test('code block unchanged', () => {
  const block = '```\nconst a = 1;\n```';
  assert.equal(markdownToTelegram(block), block);
});

test('links remain unchanged', () => {
  const link = '[text](https://example.com)';
  assert.equal(markdownToTelegram(link), link);
});

test('quotes formatted', () => {
  assert.equal(markdownToTelegram('> quote'), '>quote');
});

test('unordered list bullet', () => {
  assert.equal(markdownToTelegram('- item'), '• item');
});

test('escape special characters', () => {
  assert.equal(markdownToTelegram('Hello _world_!'), 'Hello _world_\\!');
});
