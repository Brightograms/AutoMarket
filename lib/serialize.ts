import { ICar } from "@/models/Car";

export type SerializedCar = {
  id: string;
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
  createdAt?: string;
  updatedAt?: string;
};

type CarDocument = ICar & {
  _id: { toString(): string };
  createdAt?: Date;
  updatedAt?: Date;
};

export function serializeCar(car: CarDocument): SerializedCar {
  return {
    id: car._id.toString(),
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    fuelType: car.fuelType,
    transmission: car.transmission,
    bodyType: car.bodyType,
    image: car.image,
    description: car.description,
    featured: car.featured,
    owner: car.owner,
    createdAt: car.createdAt?.toString(),
    updatedAt: car.updatedAt?.toString(),
  };
}

export function serializeCars(cars: CarDocument[]): SerializedCar[] {
  return cars.map(serializeCar);
}
