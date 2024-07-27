import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/utils/jwt'; 

export async function GET(req) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 401 });
    }
    const decoded = verifyToken(token);
    return NextResponse.json({ message: 'Access granted', user: decoded }, { status: 200 });
  } catch (err) {
    console.error('Error during token verification:', err);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
