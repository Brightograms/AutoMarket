import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { serializeCar, serializeCars } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const idsParam = request.nextUrl.searchParams.get("ids");
    if (idsParam) {
      const ids = idsParam
        .split(",")
        .map((id) => id.trim())
        .filter((id) => mongoose.isValidObjectId(id));

      if (ids.length === 0) {
        return NextResponse.json([]);
      }

      const cars = await Car.find({ _id: { $in: ids } })
        .sort({ featured: -1, createdAt: -1 })
        .lean();
      return NextResponse.json(serializeCars(cars));
    }

    const cars = await Car.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(serializeCars(cars));
  } catch (error) {
    console.error("GET /api/cars error:", error);
    return NextResponse.json(
      { message: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const requiredFields = [
      "brand",
      "model",
      "year",
      "price",
      "mileage",
      "fuelType",
      "transmission",
      "bodyType",
      "image",
      "description",
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const car = await Car.create({
      brand: body.brand,
      model: body.model,
      year: Number(body.year),
      price: Number(body.price),
      mileage: Number(body.mileage),
      fuelType: body.fuelType,
      transmission: body.transmission,
      bodyType: body.bodyType,
      image: body.image,
      description: body.description,
      featured: Boolean(body.featured),
      owner: sessionUser.id,
    });

    return NextResponse.json(serializeCar(car), { status: 201 });
  } catch (error) {
    console.error("POST /api/cars error:", error);
    return NextResponse.json(
      { message: "Failed to create car" },
      { status: 500 }
    );
  }
}
