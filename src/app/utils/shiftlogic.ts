import { PrismaClient } from '@prisma/client';
import { validateShift } from './shiftValidator';

// Initialize PrismaClient
const prisma = new PrismaClient();

/**
 * Helper function to create a shift.
 */
async function createShift(startTime: Date, endTime: Date, userId: string, notes: string) {
  console.log("About to call prisma.shift.create");
  const shift = await prisma.shift.create({
    data: {
      startTime,
      endTime,
      userId,
      notes
    }
  });
  console.log("Returned value from prisma.shift.create:", shift);
  return shift;
}

/**
 * Helper function to find and delete a shift.
 */
async function deleteShift(shiftId: string) {
  console.log("About to call prisma.shift.delete");
  const result = await prisma.shift.delete({
    where: { id: shiftId }
  });
  console.log("Returned value from prisma.shift.delete:", result);
  return result;
}

/**
 * Helper function to find a shift.
 */
async function findShift(shiftId: string, userId: string) {
  console.log("About to call prisma.shift.findFirst");
  const shift = await prisma.shift.findFirst({
    where: {
      id: shiftId,
      userId
    }
  });
  console.log("Returned value from prisma.shift.findFirst:", shift);
  return shift;
}

/**
 * Register a user for a shift.
 */
export const registerForShift = async (startTime: Date, endTime: Date, userId: string, notes: string): Promise<string> => {
  const validationError = await validateShift(startTime, endTime, userId);
  if (validationError) return validationError;

  await createShift(startTime, endTime, userId, notes);
  return 'Success';
};

/**
 * Unregister a user from a shift.
 */
export const unregisterFromShift = async (shiftId: string, userId: string): Promise<string> => {
  try {
    console.log(`Arguments being passed: shiftId = ${shiftId}, userId = ${userId}`);
    console.log("About to call prisma.shift.findFirst");
    
    const shift = await prisma.shift.findFirst({
      where: {
        id: shiftId,
        userId
      }
    });

    console.log("Returned value from prisma.shift.findFirst:", shift);

    if (!shift) return 'Shift not found';
    
    await prisma.shift.delete({
      where: { id: shiftId }
    });

    return 'Successfully unregistered';
  } catch (error) {
    console.log("An error occurred:", error);
    return 'An error occurred';
  }
};


