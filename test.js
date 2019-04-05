const { default: featureGate } = require('./lib');
const assert = require('assert');

const gate = featureGate({
  hidden: 0,
  shown: 100,
 });
 
const id = 'foo';

// missing feature 
assert.equal(
  gate('unknown', id),
  false,
);

// 0 percent
assert.equal(
  gate('hidden', id),
  false,
);

// 100 percent
assert.equal(
  gate('shown', id),
  true,
);
