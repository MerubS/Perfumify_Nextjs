import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"; 
import path from 'path';
import fs from 'fs';
import { generateToken } from '@/app/utils/jwt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password cannot be empty.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'userCredentials.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);
    const user = users.find(user => user.email === email);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken({ email: user.email });
      return NextResponse.json({ message: 'Login successful.', token }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }
  } catch (err) {
    console.error('Error during login:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

