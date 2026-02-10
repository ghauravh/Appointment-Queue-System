import { getQueueAndWaitTime } from "./queueUtils";
// recomendation slot
export const getRecommendedSlot = (
  provider,
  date,
  slots
) => {
  if (!provider || !date) return null;

  let bestSlot = null;
  let minWait = Infinity;

  slots.forEach((slot) => {
    const info = getQueueAndWaitTime(provider, date, slot);
    if (info && info.estimatedWaitTime < minWait) {
      minWait = info.estimatedWaitTime;
      bestSlot = slot;
    }
  });

  return {
    slot: bestSlot,
    waitTime: minWait,
  };
};