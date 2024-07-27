import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; 
import path from 'path';
import fs from 'fs';
import { generateToken } from '@/app/utils/jwt';

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Replace this with your domain in production
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS requests for preflight checks
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Handle POST requests for login
export async function POST(req) {
  try {
    // CORS preflight headers are already applied
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
