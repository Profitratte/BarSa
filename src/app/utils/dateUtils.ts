// DateUtils.ts
import { fetchHolidays } from './holidays';

export const isWeekend = (date: Date): boolean => [0, 6].includes(date.getDay());

export const isHoliday = async (date: Date): Promise<boolean> => {
  const holidayDates = await fetchHolidays();
  return holidayDates.includes(date.toISOString().split('T')[0]);
};
