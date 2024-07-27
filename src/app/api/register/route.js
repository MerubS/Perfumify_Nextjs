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
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return jsonResponse({ error: 'Missing required fields' }, 400);
    }

    let users = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(fileData);
    }

    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return jsonResponse({ error: 'User already exists' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword, username });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

    const token = generateToken({ email });
    return jsonResponse({ message: 'User added successfully', token }, 201);
  } catch (err) {
    return handleError(err, 'Error during registration:', 500);
  }
}
