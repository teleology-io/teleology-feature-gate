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
To use the feature gate it needs to be seeded with configuration data. Configuration data entries in a key-value object. 

**Example:**

```
import featureGate from '@teleology/feature-gate';

const gate = featureGate({
  showPageA: 0.34,
  showFeatureX: 0.45,
});
```

Now that it is seeded we can test if a unique identifier can subscribe to that feature. 

**Example:**

```
const userId = '12345';
const canView = gate('showPageA', userId);
if ( canView ) {
    console.log('You can see page A!!');
}
```

Most feature gates will be used in conjunction with a remote configuration system. This way devs can update gates on-the-fly.

**Configuration-Based Example:**
```
import featureGate from '@teleology/feature-gate';
import fetchConfig from 'util/configUtils';

export default async () => featureGate( await fetchConfig() );
```

## How it works
Most feature gates are used to opt-in a user or system. For these cases we want consistent, and non-storable conditions. That is why the feature and unique identifier are hashed, xor'd, and then modded in order to compute a percentile. If the result falls within the acceptable range the unique identifier is opted in. The following are exceptions to the computation. 
- A missing feature 'key' always returns false
- 0 will always return false
- 1 or more will always return true


