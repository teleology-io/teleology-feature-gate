import featureGate from '../';
import ids from './data';

const configuration = {
  pageA: 0.30,
  pageB: 0.95,
  pageC: 0.50,
  pageD: 0.99,
  pageX: 1,
};
 
test('configure featureGate', () => {
  const gate = featureGate(configuration);
  expect(gate).toBeDefined();
});

const runFeature = (feature: string): number => {
  const gate = featureGate(configuration);
  const result: any = {};
  for (const id of ids) {
    result[id] = gate(feature, id);
  }
  const valid = Object.keys(result).filter((k) => result[k]);
  return valid.length / ids.length;
}

test('pageA', () => {
  expect(runFeature('pageA')).toEqual(0.306);
});

test('pageB', () => {
  expect(runFeature('pageB')).toEqual(0.9505);
});

test('pageC', () => {
  expect(runFeature('pageC')).toEqual(0.503);
});

test('pageD', () => {
  expect(runFeature('pageD')).toEqual(0.9865);
});

test('pageX', () => {
  expect(runFeature('pageX')).toEqual(1);
});