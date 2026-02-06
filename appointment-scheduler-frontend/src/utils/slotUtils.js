export const getBookedSlots = (provider, date) => {
  if (!provider || !date) return [];

  // Mock logic (replace with backend later)
  if (provider.includes("Ananya")) {
    return ["09:30", "10:00"];
  }

  if (provider.includes("Mehul")) {
    return ["11:00", "11:30"];
  }

  return [];
};