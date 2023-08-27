import { fetchHolidays } from './holidays';

// Shift start and end times
const SHIFT_START_TIME = 7;
const SHIFT_END_TIME = 12;
const MAX_USERS_PER_SHIFT = 3;

// Check if the date is a weekend
const isWeekend = (date: Date): boolean => [0, 6].includes(date.getDay());

// Check if the date is a holiday
const isHoliday = async (date: Date): Promise<boolean> => {
  const holidayDates = await fetchHolidays();
  return holidayDates.includes(date.toISOString().split('T')[0]);
};

// Shift interface
interface Shift {
  date: string;
  startTime: number;
  endTime: number;
  userIds: string[];
}

// Array to hold all shifts
const shifts: Shift[] = [];

// Find a shift by date, start time, and end time
const findShift = (date: string, startTime: number, endTime: number): Shift | null => {
  return shifts.find(shift => shift.date === date && shift.startTime === startTime && shift.endTime === endTime) || null;
};

// Check if a time range overlaps with another
const isOverlapping = (start1: number, end1: number, start2: number, end2: number): boolean => {
  return (start1 < end2) && (end1 > start2);
};

// Register a user for a shift
const registerForShift = async (date: Date, startTime: number, endTime: number, userId: string): Promise<string> => {
  const dateStr = date.toISOString().split('T')[0];

  // Validate the shift
  if (await isHoliday(date)) return 'Feiertag, keine Schichten verfügbar';
  if (isWeekend(date)) return 'Wochenende, keine Schichten verfügbar';
  if (startTime < SHIFT_START_TIME || endTime > SHIFT_END_TIME) return `Schichtzeiten müssen zwischen ${SHIFT_START_TIME} und ${SHIFT_END_TIME} liegen`;

  // Check for overlapping shifts that are full
  for (const shift of shifts) {
    if (shift.date === dateStr && shift.userIds.length >= MAX_USERS_PER_SHIFT) {
      if (isOverlapping(startTime, endTime, shift.startTime, shift.endTime)) {
        return 'Zeitraum überlappt mit einer bereits vollen Schicht';
      }
    }
  }

  // Check if the user is already registered for the shift
  let shift = findShift(dateStr, startTime, endTime);
  if (!shift) {
    shift = { date: dateStr, startTime, endTime, userIds: [] };
    shifts.push(shift);
  }

  // Check if the shift is already full
  if (shift.userIds.length >= MAX_USERS_PER_SHIFT) return 'Schicht bereits voll';

  shift.userIds.push(userId);
  return 'Success';
};

// Unregister a user from a shift
const unregisterFromShift = (date: Date, startTime: number, endTime: number, userId: string): string => {
    const dateStr = date.toISOString().split('T')[0];
  
    // Find the shift
    let shift = findShift(dateStr, startTime, endTime);
    if (!shift) {
      return 'Schicht nicht gefunden';
    }
  
    // Find the user in the shift
    const userIndex = shift.userIds.indexOf(userId);
    if (userIndex === -1) {
      return 'User nicht in dieser Schicht gefunden';
    }
  
    // Remove the user from the shift
    shift.userIds.splice(userIndex, 1);
    return 'Erfolgreich abgemeldet';
  };



