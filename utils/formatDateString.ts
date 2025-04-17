export const formatDateString = (startDate: string, endDate?: string | null): string => {
  if (!endDate || startDate === endDate) {
    return startDate;
  }

  return `${startDate} - ${endDate}`;
};
