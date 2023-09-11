// ShiftValidator.ts
import { PrismaClient } from '@prisma/client';
import { isWeekend, isHoliday } from './dateUtils';

const prisma = new PrismaClient();

export const validateShift = async (startTime: Date, endTime: Date, userId: string): Promise<string | null> => {
  if (await isHoliday(startTime)) return 'Holiday, no shifts available';
  if (isWeekend(startTime)) return 'Weekend, no shifts available';

  const overlappingShifts = await prisma.shift.findMany({
    where: {
      userId,
      OR: [
        { startTime: { lte: startTime }, endTime: { gte: startTime } },
        { startTime: { lte: endTime }, endTime: { gte: endTime } }
      ]
    }
  });

  if (overlappingShifts.length > 0) return 'Time overlaps with an already full shift';

  return null;
};
