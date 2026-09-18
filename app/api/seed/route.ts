import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { seedCars } from "@/data/cars";
import { getSessionUser } from "@/lib/auth";

export async function POST() {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    await Car.deleteMany({});
    const inserted = await Car.insertMany(
      seedCars.map((car) => ({ ...car, owner: sessionUser.id }))
    );

    return NextResponse.json({
      message: "Database seeded successfully",
      count: inserted.length,
    });
  } catch (error) {
    console.error("POST /api/seed error:", error);
    return NextResponse.json(
      { message: "Failed to seed database" },
      { status: 500 }
    );
  }
}
