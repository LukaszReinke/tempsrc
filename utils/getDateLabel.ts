export const getDateLabel = (startDate: string, endDate?: string | null): 'date' | 'dates' => {
  if (!endDate || startDate === endDate) {
    return 'date';
  }

  return 'dates';
};
