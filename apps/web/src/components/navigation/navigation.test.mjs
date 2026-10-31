import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getActiveNavigationDestination,
  NAVIGATION_DESTINATIONS,
} from './navigation.js';

test('desktop and mobile navigation share the same unique destinations', () => {
  assert.deepEqual(
    NAVIGATION_DESTINATIONS.map(({ href }) => href),
    ['/', '/recipes'],
  );
  assert.equal(
    new Set(NAVIGATION_DESTINATIONS.map(({ href }) => href)).size,
    NAVIGATION_DESTINATIONS.length,
  );
  assert.deepEqual(
    NAVIGATION_DESTINATIONS.map(({ icon }) => icon),
    ['home', 'recipes'],
  );
});

test('the active destination matches recipe routes and nested recipe routes', () => {
  assert.equal(getActiveNavigationDestination('/recipes').href, '/recipes');
  assert.equal(getActiveNavigationDestination('/recipes/42').href, '/recipes');
});

test('the active destination falls back to Home for unmatched routes', () => {
  assert.equal(getActiveNavigationDestination('/unknown').href, '/');
});
