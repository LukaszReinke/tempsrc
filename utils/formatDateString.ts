export const formatDateString = (start_date: string, end_date: string) =>
  start_date === end_date ? start_date : `${start_date} - ${end_date}`;
