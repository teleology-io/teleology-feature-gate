![npm downloads total](https://img.shields.io/npm/dt/@teleology/feature-gate.svg) ![npm version](https://img.shields.io/npm/v/@teleology/feature-gate.svg) ![npm license](https://img.shields.io/npm/l/@teleology/feature-gate.svg)

# @teleology/feature-gate
A simple, configuration-based, boolean feature gate 

## Installation
```
npm install --save @teleology/feature-gate
```
or
```
yarn add @teleology/feature-gate
```

## Usage
Example:
```
import featureGate from '@teleology/feature-gate';

const uniqueId = '12345';
const featurePercentages = {
  featureA: 10,
  featureB: 99,
  featureX: 50,
};

const configuredGate = featureGate(featurePercentages);
const canView = configuredGate('featureA', uniqueId);

console.log(`Id ${uniqueId} ${canView ? 'can' : 'cannot'} view featureA`);
```

## Percentages
Gated features are integer based, ranging from an inclusive 0-100. 
- A missing feature 'key' always returns false
- 0 percent will always return false
- 100 percent will always return true

Example:
```
const { default: featureGate } = require('@teleology/feature-gate');
const assert = require('assert');

const id = 'foo';
const gate = featureGate({
  hidden: 0,
  shown: 100,
});

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
```
