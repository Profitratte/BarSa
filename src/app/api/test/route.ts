import { NextResponse, NextRequest } from 'next/server';

export async function GET(Request: NextRequest) {
  try {

    //logic here
    
    return NextResponse.json({message: "successfully called GET/test"}, {status: 200});
  } catch (error) {
    console.error("GET/test error: ", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}

export async function POST(Request: NextRequest) {
  try {

    //logic here
    
    return NextResponse.json({message: "successfully called POST/test"}, {status: 200});
  } catch (error) {
    console.error("POST/test error: ", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
