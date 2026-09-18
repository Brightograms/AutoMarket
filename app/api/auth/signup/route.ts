import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import {
  hashPassword,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  type SessionUser,
} from "@/lib/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash });

    const sessionUser: SessionUser = {
      id: String(user._id),
      name: user.name,
      email: user.email,
    };

    const response = NextResponse.json(sessionUser, { status: 201 });
    response.cookies.set(SESSION_COOKIE, await signSession(sessionUser), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return response;
  } catch (error) {
    console.error("POST /api/auth/signup error:", error);
    return NextResponse.json({ message: "Failed to sign up" }, { status: 500 });
  }
}
