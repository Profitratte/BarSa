/*  
import { registerForShift, unregisterFromShift } from '../src/app/utils/shiftlogic';
import { PrismaClient, Shift } from '@prisma/client';

const mockShiftCreate = jest.fn();
const mockShiftFindMany = jest.fn();
const mockShiftFindFirst = jest.fn();
const mockShiftDelete = jest.fn();

jest.mock('@prisma/client', () => {
  const actualPrisma = jest.requireActual('@prisma/client');
  return {
    ...actualPrisma,
    PrismaClient: jest.fn(() => {
      return {
        shift: {
          create: mockShiftCreate,
          findMany: mockShiftFindMany,
          findFirst: mockShiftFindFirst,
          delete: mockShiftDelete,
        },
      };
    }),
  };
});

describe('Shift Logic', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma = new PrismaClient();
  });

  it('should successfully register for a shift', async () => {
    mockShiftFindMany.mockResolvedValue([]);
    mockShiftCreate.mockResolvedValue({} as Shift);

    const result = await registerForShift(new Date('2023-09-07T09:00:00.000Z'), new Date('2023-09-07T17:00:00.000Z'), 'user1', 'notes');
    expect(result).toEqual('Success');
    expect(mockShiftFindMany).toHaveBeenCalledTimes(1);
    expect(mockShiftCreate).toHaveBeenCalledTimes(1);
  });

  it('should successfully unregister from a shift', async () => {
    mockShiftFindFirst.mockResolvedValue({ id: '1', userId: 'user1' } as Shift);
    mockShiftDelete.mockResolvedValue({} as Shift);

    const result = await unregisterFromShift('1', 'user1');
    expect(result).toEqual('Erfolgreich abgemeldet');
    expect(mockShiftFindFirst).toHaveBeenCalledTimes(1);
    expect(mockShiftDelete).toHaveBeenCalledTimes(1);
  });
  
  // Add more test cases to cover other scenarios
});



import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  // Initialize the database, you might want to create a test database for this
});

afterAll(async () => {
  // Clean up the database and close the Prisma client
  await prisma.$disconnect();
});

describe("Shift Operations", () => {
  let shiftId: string;
  let userId: string;

  // Create a new user for the shift
  beforeAll(async () => {
    const newUser = await prisma.user.create({
      data: {
        username: "testUser",
        password: "testPassword",
        role: "user",
      },
    });
    userId = newUser.id;
  });

  // Clean up the user after tests
  afterAll(async () => {
    await prisma.user.delete({
      where: { id: userId },
    });
  });

  it("should register a new shift", async () => {
    const newShift = await prisma.shift.create({
      data: {
        startTime: new Date(),
        endTime: new Date(),
        userId: userId,
      },
    });
    shiftId = newShift.id;

    expect(newShift).toHaveProperty("id");
    expect(newShift.userId).toBe(userId);
  });

  it("should delete the shift", async () => {
    const deletedShift = await prisma.shift.delete({
      where: { id: shiftId },
    });

    expect(deletedShift.id).toBe(shiftId);
  });
});
*/

// Import the necessary modules
// Import the necessary modules
import { registerForShift, unregisterFromShift } from '../src/app/utils/shiftlogic';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        shift: {
          create: jest.fn().mockResolvedValue({ id: 'someShiftId', userId: 'someUserId' }),
          findMany: jest.fn().mockResolvedValue([]),
          findFirst: jest.fn().mockResolvedValue({ id: 'someShiftId', userId: 'someUserId' }),
          delete: jest.fn().mockResolvedValue(true),
        },
      };
    }),
  };
});

jest.mock('../src/app/utils/shiftValidator', () => ({
  validateShift: jest.fn().mockResolvedValue(null),
}));

describe('ShiftLogic', () => {
  it('should register a new shift', async () => {
    const result = await registerForShift(new Date(), new Date(), 'someUserId', 'some notes');
    expect(result).toBe('Success');
  });

  it('should unregister a shift', async () => {
    const result = await unregisterFromShift('someShiftId', 'someUserId');
    expect(result).toBe('Successfully unregistered');
  });
});




