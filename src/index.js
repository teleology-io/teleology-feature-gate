import { xor } from './hash';
import { mod } from './math';
import { pick } from './pick';

const MAX_PERCENTAGE = 100;

export default (config) => (path, uniqueId) => {
  const percentage = pick(config, path, false);
  if (typeof percentage === 'boolean') return percentage;

  if (percentage >= 1) return true;
  if (percentage === 0) return false;

  // create a hash from unique and path
  const hash = xor(path, uniqueId);

  if (Array.isArray(percentage)) {
    const percentile = mod(hash, percentage.length);
    return percentage[percentile];
  }

  // get what percentile this unique value is in the rollout
  const percentile = mod(hash, MAX_PERCENTAGE);

  // if not boolean, get amount of rollout to show, i.e. 0.1
  if (percentile / MAX_PERCENTAGE < percentage) {
    return true;
  }

  return false;
};
