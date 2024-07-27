import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; 
import path from 'path';
import fs from 'fs';
import { generateToken } from '@/app/utils/jwt';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password cannot be empty.' }, {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const filePath = path.join(process.cwd(), 'public', 'userCredentials.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);
    const user = users.find(user => user.email === email);

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken({ email: user.email });
      return NextResponse.json({ message: 'Login successful.', token }, {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      return NextResponse.json({ error: 'Invalid credentials.' }, {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.error('Error during login:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
