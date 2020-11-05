import featureGate from '../lib';
import ids from './data';

const configuration = {
  pageA: 0.3,
  pageB: 0.95,
  pageC: 0.5,
  pageD: 0.99,
  pageX: 1,
  welcome: {
    screens: [
      'A', 'B', 'C', 'D'
    ]
  },
  sendNotifications: false,
};

test('configure featureGate', () => {
  const gate = featureGate(configuration);
  expect(gate).toBeDefined();
});

const runFeature = (feature) => {
  const gate = featureGate(configuration);
  const result = {};
  for (const id of ids) {
    result[id] = gate(feature, id);
  }
  const valid = Object.keys(result).filter((k) => result[k]);
  return valid.length / ids.length;
};

test('A-B Testing', () => {
  const gate = featureGate(configuration);
  const result = ids.map((id) => gate('welcome.screens', id));
  const stats = result.reduce((_, f) => ({
    A: _.A + (f === 'A' ? 0 : 1),
    B: _.B + (f === 'B' ? 0 : 1),
    C: _.C + (f === 'C' ? 0 : 1),
    D: _.D + (f === 'D' ? 0 : 1), 
  }), { A: 0, B: 0, C: 0, D: 0 });

  expect(stats).toMatchSnapshot();
});

test('Boolean', () => {
  const gate = featureGate(configuration);
  expect(gate('sendNotifications', '123')).toBeFalsy();
})

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
