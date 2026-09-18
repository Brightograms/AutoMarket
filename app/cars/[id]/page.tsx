import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { formatPrice, formatMileage } from "@/data/cars";
import { serializeCars } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";
import CarCard from "@/components/CarCard";
import InquiryForm from "./InquiryForm";

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const [car, user] = await Promise.all([Car.findById(id).lean(), getSessionUser()]);

  if (!car) {
    notFound();
  }

  const similarCars = serializeCars(
    await Car.find({
      _id: { $ne: car._id },
      $or: [{ brand: car.brand }, { bodyType: car.bodyType }],
    })
      .sort({ featured: -1, createdAt: -1 })
      .limit(4)
      .lean()
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Image
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        width={800}
        height={500}
        className="w-full rounded-lg object-cover"
      />
      <h1 className="mt-6 text-3xl font-bold">
        {car.year} {car.brand} {car.model}
      </h1>
      <p className="mt-2 text-2xl font-bold text-stone-800">
        {formatPrice(car.price)}
      </p>
      <p className="mt-4 text-stone-600">{car.description}</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-stone-500">Mileage</p>
          <p className="font-semibold">{formatMileage(car.mileage)}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Fuel</p>
          <p className="font-semibold">{car.fuelType}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Transmission</p>
          <p className="font-semibold">{car.transmission}</p>
        </div>
      </div>
      <Link href="/cars" className="mt-6 inline-block text-blue-600 hover:underline">
        Back to browse
      </Link>
      <InquiryForm user={user} carId={id} />

      {similarCars.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Similar Cars</h2>
          <p className="mb-6 text-sm text-stone-600">
            More {car.bodyType.toLowerCase()}s and cars from {car.brand}.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarCars.map((similar) => (
              <CarCard key={similar.id} car={similar} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
