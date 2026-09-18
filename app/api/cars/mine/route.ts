import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { serializeCars } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const cars = await Car.find({ owner: sessionUser.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(serializeCars(cars));
  } catch (error) {
    console.error("GET /api/cars/mine error:", error);
    return NextResponse.json(
      { message: "Failed to fetch your cars" },
      { status: 500 }
    );
  }
}
