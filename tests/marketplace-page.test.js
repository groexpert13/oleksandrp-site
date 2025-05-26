const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const src = fs.readFileSync('app/marketplace/[slug]/page.tsx', 'utf8');

test('page uses standardized toast notifications', () => {
  assert.ok(src.includes('useToast'), 'useToast hook missing');
  assert.ok(src.includes('toast({'), 'toast call missing');
});

test('markdown renderer used', () => {
  assert.ok(src.includes('ReactMarkdown'), 'ReactMarkdown not used');
});

test('participation note translation key present', () => {
  assert.ok(src.includes("t('participationNote')"), 'participationNote not used');
});

test('project details note translation key present', () => {
  assert.ok(src.includes("t('projectDetailsNote')"), 'projectDetailsNote not used');
});
