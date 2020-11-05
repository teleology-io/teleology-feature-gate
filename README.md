![npm downloads total](https://img.shields.io/npm/dt/@teleology/feature-gate.svg) ![npm version](https://img.shields.io/npm/v/@teleology/feature-gate.svg) ![npm license](https://img.shields.io/npm/l/@teleology/feature-gate.svg)

# @teleology/feature-gate

As there are often various ways of doing things, this library can be used in three ways. Boolean values, rolling values, or array iteration. The use of a secondary unique value as a param is used for consistency.

## Installation
```
npm install --save @teleology/feature-gate
```
or
```
yarn add @teleology/feature-gate
```

## Usage
To use the feature gate it needs to be seeded with configuration data. Configuration data entries are defined as a key-value object. Referencing config objects are done with dot-notation. 

### Rolling Example
---
A rolling example is any value between 0-1 and can be increased to 'roll-out' features. The rollout is done via a hash of the path as well as the userId, meaning it is both consistent for userIds as well as scaleable. 

```javascript
const factory = require('@teleology/feature-gate');

const USER_ID = 'DE5A50BC-08CE-47C4-B186-D6B29E710188';

const gate = factory({
  showNewWelcome: 0.34,
  showNotifications: 1
});

gate('showNewWelcome', USER_ID) // false
```

### Boolean Example
---
If you know this value is going to be a boolean, you don't need a unique secondary param.

```javascript
const factory = require('@teleology/feature-gate');

const USER_ID = 'DE5A50BC-08CE-47C4-B186-D6B29E710188';

const gate = factory({
  features: {
    a: 0.12,
    b: true
  }
});

gate('features.b', USER_ID); // true
```

### A-B(n) Testing Example
---
Using the same hashing function as the rolling gate, buckets certain users into an array of selections. 

```javascript
const factory = require('@teleology/feature-gate');

const USER_ID = 'DE5A50BC-08CE-47C4-B186-D6B29E710188';

const gate = factory({
  welcome: {
    screens: [
      'A',
      'B',
      'C',
      'D',
    ]
  },
  theme: {
    blue: '0000ff'
  }
});

gate('welcome.screens', USER_ID); // 'A'
```