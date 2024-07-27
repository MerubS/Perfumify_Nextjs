import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { generateToken } from '@/app/utils/jwt';

const filePath = path.join(process.cwd(), 'public', 'userCredentials.json');

export async function POST(req) {
  try {
    const { email, password, username } = await req.json();
    if (!email || !password || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    let users = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      users = JSON.parse(fileData);
    }
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword, username });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

    const token = generateToken({ email: users.email });
    return NextResponse.json({ message: "User added successfully", token }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
