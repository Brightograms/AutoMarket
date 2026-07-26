import images from "next/image";
export type Car = {
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
};

export const cars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 28900,
    mileage: 24500,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "/images/toyotacamry.png",
    description:
      "Reliable midsize sedan with a comfortable ride, strong fuel economy, and modern safety features.",
    featured: true,
  },
  {
    id: "2",
    brand: "BMW",
    model: "330i",
    year: 2021,
    price: 41900,
    mileage: 18200,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    description:
      "Sporty luxury sedan with precise handling, premium interior, and the latest driver tech.",
    featured: true,
  },
  {
    id: "3",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 38900,
    mileage: 8900,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    description:
      "All-electric sedan with instant acceleration, minimalist interior, and over-the-air updates.",
    featured: false,
  },
  {
    id: "4",
    brand: "Ford",
    model: "F-150",
    year: 2020,
    price: 36500,
    mileage: 32100,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Truck",
    image:
      "/images/Ford.png",
    description:
      "Full-size pickup truck with best-in-class towing capacity and a spacious cabin.",
    featured: true,
  },
  {
    id: "5",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 24500,
    mileage: 5600,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Sedan",
    image:
      "/images/HondaCivic.png",
    description:
      "Compact car with agile handling, great fuel economy, and a reputation for longevity.",
    featured: false,
  },
  {
    id: "6",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2022,
    price: 46900,
    mileage: 15600,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    description:
      "Refined compact luxury sedan with a smooth hybrid powertrain and upscale cabin materials.",
    featured: false,
  },
  {
    id: "7",
    brand: "Audi",
    model: "A4",
    year: 2022,
    price: 38900,
    mileage: 19800,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
    description:
      "Premium sedan with Quattro all-wheel drive, refined interior, and advanced virtual cockpit.",
    featured: true,
  },
  {
    id: "8",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2021,
    price: 112000,
    mileage: 7600,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Coupe",
    image:
      "/images/Porsche.png",
    description:
      "Iconic sports car with timeless design, thrilling performance, and everyday usability.",
    featured: true,
  },
  {
    id: "9",
    brand: "Jeep",
    model: "Wrangler",
    year: 2022,
    price: 43800,
    mileage: 12300,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description:
      "Rugged off-road SUV with removable doors, four-wheel drive, and open-air freedom.",
    featured: false,
  },
  {
    id: "10",
    brand: "Chevrolet",
    model: "Silverado 1500",
    year: 2021,
    price: 42900,
    mileage: 28400,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Truck",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    description:
      "Dependable full-size truck with strong payload capacity and a smooth highway ride.",
    featured: false,
  },
  {
    id: "11",
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    price: 31500,
    mileage: 4200,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    description:
      "Compact SUV with excellent fuel economy, spacious interior, and Toyota reliability.",
    featured: true,
  },
  {
    id: "12",
    brand: "Honda",
    model: "CR-V",
    year: 2022,
    price: 29900,
    mileage: 15400,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    image:
      "/images/HondaCRV.png",
    description:
      "Family-friendly SUV with a roomy cabin, smooth ride, and top safety ratings.",
    featured: false,
  },
  {
    id: "13",
    brand: "Ford",
    model: "Mustang GT",
    year: 2020,
    price: 46900,
    mileage: 21100,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Coupe",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
    description:
      "American muscle coupe with a roaring V8 engine and classic fastback styling.",
    featured: false,
  },
  {
    id: "14",
    brand: "Lexus",
    model: "RX 350",
    year: 2022,
    price: 52900,
    mileage: 13800,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "SUV",
    image:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=800&q=80",
    description:
      "Luxury midsize SUV with a whisper-quiet cabin, hybrid efficiency, and proven reliability.",
    featured: false,
  },
  {
    id: "15",
    brand: "Hyundai",
    model: "Elantra",
    year: 2023,
    price: 21900,
    mileage: 3800,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    description:
      "Stylish compact sedan with sharp design, generous tech, and impressive warranty coverage.",
    featured: false,
  },
  {
    id: "16",
    brand: "Volkswagen",
    model: "Golf GTI",
    year: 2021,
    price: 33500,
    mileage: 18700,
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    image:
      "/images/Volkwagen.png",
    description:
      "Hot hatch icon with punchy turbo power, nimble handling, and everyday practicality.",
    featured: false,
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-US").format(mileage) + " mi";
}
