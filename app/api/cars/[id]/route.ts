import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { serializeCar } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid car ID" }, { status: 400 });
    }

    await connectDB();
    const car = await Car.findById(id).lean();

    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(serializeCar(car));
  } catch (error) {
    console.error("GET /api/cars/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch car" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid car ID" }, { status: 400 });
    }

    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    const existing = await Car.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    if (existing.owner !== sessionUser.id) {
      return NextResponse.json(
        { message: "You can only update your own cars" },
        { status: 403 }
      );
    }

    const updated = await Car.findByIdAndUpdate(
      id,
      {
        brand: body.brand,
        model: body.model,
        year: body.year !== undefined ? Number(body.year) : undefined,
        price: body.price !== undefined ? Number(body.price) : undefined,
        mileage: body.mileage !== undefined ? Number(body.mileage) : undefined,
        fuelType: body.fuelType,
        transmission: body.transmission,
        bodyType: body.bodyType,
        image: body.image,
        description: body.description,
        featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      },
      { new: true, runValidators: true }
    ).lean();

    return NextResponse.json(serializeCar(updated!));
  } catch (error) {
    console.error("PUT /api/cars/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update car" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid car ID" }, { status: 400 });
    }

    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const existing = await Car.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    if (existing.owner !== sessionUser.id) {
      return NextResponse.json(
        { message: "You can only delete your own cars" },
        { status: 403 }
      );
    }

    await Car.findByIdAndDelete(id);

    return NextResponse.json({ message: "Car deleted" });
  } catch (error) {
    console.error("DELETE /api/cars/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete car" },
      { status: 500 }
    );
  }
}
