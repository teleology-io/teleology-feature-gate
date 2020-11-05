import { dot } from './dot';

export const pick = (obj, path, def) => {
  try {
    return dot(path).reduce((a, b) => a[b], obj);
  } catch (e) {
    return def;
  }
};
