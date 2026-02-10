import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader === 'Bearer INVALID_TOKEN') {
    return NextResponse.json(
      { message: 'Token expired' },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: 'Success! You are authorized.' });
}
