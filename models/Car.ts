import mongoose, { Schema } from "mongoose";

export interface ICar {
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  bodyType: "Sedan" | "SUV" | "Truck" | "Coupe" | "Hatchback" | "Wagon";
  image: string;
  description: string;
  featured: boolean;
  owner?: string;
}

const CarSchema = new Schema<ICar>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      required: true,
    },
    bodyType: {
      type: String,
      enum: ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Wagon"],
      required: true,
    },
    image: { type: String, required: true },
    description: { type: String, required: true },
    featured: { type: Boolean, default: false },
    owner: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Car = mongoose.models.Car || mongoose.model<ICar>("Car", CarSchema);
