import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client'
import bcrypt, { genSalt } from 'bcrypt';

const prisma = new PrismaClient();

export async function GET(Request: NextRequest) {
  try {

    //logic here
    
    return NextResponse.json({message: "successfully called GET/user"}, {status: 200});
  } catch (error) {
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}

export async function POST(Request: NextRequest) {
  try {

    const {username, password} = await Request.json();

    

    //debug
    console.log("data: ", username, password);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const createUser = await prisma.user.create({data: {username, password: hashedPassword}})

    //debug
    console.log("createdUser: ", createUser);

    
    return NextResponse.json({message: "successfully called POST/user", createdUser: createUser}, {status: 200});
  } catch (error) {
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
