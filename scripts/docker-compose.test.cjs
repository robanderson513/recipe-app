const assert = require('node:assert/strict');
const { mkdtempSync, rmSync, writeFileSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const test = require('node:test');
const { getNpmrc } = require('./docker-compose.cjs');

test('uses GITHUB_NPMRC when it is set', () => {
  assert.equal(getNpmrc({ env: { GITHUB_NPMRC: 'user config' }, npmrcPath: 'unused' }), 'user config');
});

test('falls back to the user npm configuration', () => {
  const directory = mkdtempSync(join(tmpdir(), 'recipe-app-npmrc-'));
  const npmrcPath = join(directory, '.npmrc');

  try {
    writeFileSync(npmrcPath, 'user config');
    assert.equal(getNpmrc({ env: {}, npmrcPath }), 'user config');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('reports when no user npm configuration exists', () => {
  assert.throws(
    () => getNpmrc({ env: {}, npmrcPath: join(tmpdir(), 'missing-recipe-app-npmrc') }),
    /GitHub Packages credentials are unavailable/
  );
});
