import { xor } from './hash';
import { mod } from './math';

interface Configuration {
  [key: string]: number,
}

const MAX_PERCENTAGE = 100;

export default (config: Configuration) => 
  (feature: string, uniqueId: string) => {
  const percentage = config[feature] || 0;
  if (percentage === MAX_PERCENTAGE) return true;
  if (percentage === 0) return false;

  // create a hash from unique and feature
  const hash = xor(feature, uniqueId);

  // get what percentile this unique value is in the rollout
  const percentile = mod(hash, MAX_PERCENTAGE);

  // if not boolean, get amount of rollout to show, i.e. 0.1
  if (percentile < percentage) {
    return true;
  }

  return false;
};
