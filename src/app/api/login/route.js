import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import { generateToken } from '@/app/utils/jwt';
import { jsonResponse, handleError } from '@/app/utils/responseUtils';

const filePath = path.join(process.cwd(), 'public', 'userCredentials.json');

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { ...corsHeaders },
  });
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return jsonResponse({ error: 'Email and password cannot be empty.' }, 400);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);
    const user = users.find(user => user.email === email);

    if (!user) {
      return jsonResponse({ error: 'User not found.' }, 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken({ email: user.email });
      return jsonResponse({ message: 'Login successful.', token }, 200);
    } else {
      return jsonResponse({ error: 'Invalid credentials.' }, 401);
    }
  } catch (err) {
    return handleError(err, 'Error during login:', 500);
  }
}
