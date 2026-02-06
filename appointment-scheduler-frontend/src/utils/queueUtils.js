import { TIME_SLOTS } from "../data/timeSlots";
import { getBookedSlots } from "./slotUtils";
import { AVERAGE_CONSULTATION_MINUTES } from "../config/clinicConfig";

/**
 * Returns queue number and estimated wait time
 */
export const getQueueAndWaitTime = (provider, date, selectedSlot) => {
  if (!provider || !date || !selectedSlot) {
    return null;
  }

  // Slots already booked for provider & date
  const bookedSlots = getBookedSlots(provider, date);

  // All slots before selected slot
  const slotsBefore = TIME_SLOTS.filter(
    (slot) => slot < selectedSlot
  );

  // Count how many of those are booked
  const peopleAhead = slotsBefore.filter((slot) =>
    bookedSlots.includes(slot)
  ).length;

  const queueNumber = peopleAhead + 1;
  const estimatedWaitTime = peopleAhead * AVERAGE_CONSULTATION_MINUTES;

  return {
    queueNumber,
    estimatedWaitTime,
  };
};