import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifyPassword,
  type SessionUser,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const sessionUser: SessionUser = {
      id: String(user._id),
      name: user.name,
      email: user.email,
    };

    const response = NextResponse.json(sessionUser);
    response.cookies.set(SESSION_COOKIE, await signSession(sessionUser), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return response;
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json({ message: "Failed to log in" }, { status: 500 });
  }
}
