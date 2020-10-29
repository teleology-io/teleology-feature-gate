const { default: fg } = require('./lib');
const { v4: uuid } = require('uuid');

const t = [
  'd0556ac0-88c5-4f70-a224-f2be0a90329a',
  'b511f300-4c99-4b97-89d6-2758387b0a3f',
  'a4244f0a-dab2-41a6-9758-4c36e4820236',
  'ba5f8898-753d-4811-a7e7-1650de812236',
  'd4c594e4-364d-4af1-aaef-5e466e7e8ccb'
];

const gate = fg({
  showHeader: true,
  features: {
    a: 0.5,
    b: false,
  },
  screens: {
    welcome: ['A', 'B', 'test_c', 'D', 'E'],
    empty: [],
  },
  some: {
    missing: 1
  }
});

const result = t.map((id) => ({
  id,
  result: gate('screens.welcome', id),
}));

console.log({ result });


