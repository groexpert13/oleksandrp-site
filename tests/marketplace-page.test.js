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

test('no duplicate scaling sections', () => {
  const patterns = [
    '### How to Test and Scale',
    '### Как протестировать и масштабировать',
    '### Як протестувати та масштабувати',
    '### Cómo probar y escalar'
  ];
  for (const p of patterns) {
    const matches = src.match(new RegExp(p, 'g')) || [];
    assert.equal(matches.length, 1, `Duplicate section for pattern: ${p}`);
  }
});
