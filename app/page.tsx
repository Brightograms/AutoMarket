import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Categories from "@/components/sections/Categories";
import FeaturedCars from "@/components/sections/FeaturedCars";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyAutoMarket from "@/components/sections/WhyAutoMarket";
import WaitList from "@/components/sections/WaitList";
import CTA from "@/components/sections/CTA";
import { connectDB } from "@/lib/db";
import { Car } from "@/models/Car";
import { serializeCars } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";

export default async function Home() {
  await connectDB();
  const user = await getSessionUser();

  const [featuredCars, bodyTypeCounts, totalCars] = await Promise.all([
    Car.find({ featured: true }).sort({ createdAt: -1 }).limit(6).lean(),
    Car.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$bodyType", count: { $sum: 1 } } },
    ]),
    Car.countDocuments(),
  ]);

  const counts = Object.fromEntries(
    bodyTypeCounts.map(({ _id, count }) => [_id, count])
  );

  return (
    <>
      <Hero user={user} />
      <Stats vehiclesListed={totalCars} />
      <Categories counts={counts} />
      <FeaturedCars cars={serializeCars(featuredCars)} />
      <HowItWorks />
      <WhyAutoMarket />
      <WaitList />
      <CTA />
    </>
  );
}
