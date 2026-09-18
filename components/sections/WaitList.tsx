"use client";
import { useEffect, useState } from "react";
type TimeLeft = {
 days: string;
 hours: string;
 minutes: string;
 seconds: string;
};
const launchDate = new Date("2026-09-30T00:00:00").getTime();

const getTimeLeft = (): TimeLeft => {
  const difference = launchDate - new Date().getTime();
  if (difference <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }
  return {
    days: String(
      Math.floor(difference / (1000 * 60 * 60 * 24))
    ).padStart(2, "0"),
    hours: String(
      Math.floor((difference / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0"),
    minutes: String(
      Math.floor((difference / (1000 * 60)) % 60)
    ).padStart(2, "0"),
    seconds: String(
      Math.floor((difference / 1000) % 60)
    ).padStart(2, "0"),
  };
};

export default function WaitlistSection() {
 const [timeLeft, setTimeLeft] = useState(getTimeLeft());
 const [email, setEmail] = useState("");
 const [joined, setJoined] = useState(false);
 useEffect(() => {
   const interval = setInterval(() => {
     setTimeLeft(getTimeLeft());
   }, 1000);
   return () => clearInterval(interval);
 }, []);
 function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   e.preventDefault();
   if (!email) return;
   // Replace this with your API later
   console.log(email);
   setJoined(true);
   setEmail("");
 }
 return (
<section className="relative overflow-hidden bg-black py-28">
<div className="absolute inset-0 bg-black" />
<div className="relative mx-auto max-w-6xl px-6">
<div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
<div className="px-8 py-16 md:px-16">
           {/* Badge */}
<div className="flex justify-center">
<span className="animate-pulse rounded-full border border-yellow-400/30 bg-yellow-500/20 px-6 py-2 text-sm font-semibold tracking-wide text-yellow-400">
                Launching Soon
</span>
</div>
           {/* Heading */}
<h2 className="mt-8 text-center text-4xl font-bold leading-tight text-white md:text-6xl">
             Be the First to Experience
<span className="block text-gray-400">
               AutoMarket
</span>
</h2>
<p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-300">
             Nigeria&apos;s trusted marketplace for buying and selling cars is almost here.
             Join the waitlist today to receive early access, exclusive launch
             rewards and priority notifications.
</p>
           {/* Countdown */}
<div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 text-white">
<CountdownCard
               value={timeLeft.days}
               label="Days"
             />
<CountdownCard
               value={timeLeft.hours}
               label="Hours"
             />
<CountdownCard
               value={timeLeft.minutes}
               label="Minutes"
             />
<CountdownCard
               value={timeLeft.seconds}
               label="Seconds"
             />
</div>

           {/* Waitlist Form */}
           {!joined ? (
<form
               onSubmit={handleSubmit}
               className="mx-auto mt-14 flex max-w-3xl flex-col gap-4 sm:flex-row"
>
<input
                 type="email"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="Enter your email address"
                 className="flex-1 rounded-xl border border-white/10 bg-white px-5 py-4 text-black outline-none transition focus:border-yellow-400"
               />
<button
                 type="submit"
                 className="rounded-xl bg-white px-8 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-gray-800 hover:text-white active:scale-95"
>
                  Reserve My Spot
</button>
</form>
           ) : (
<div className="mx-auto mt-14 max-w-xl rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center">
<h3 className="text-2xl font-bold text-green-400">
                 You&apos;re on the waitlist!
</h3>
<p className="mt-3 text-gray-300">
                 Thanks for joining. We&apos;ll notify you as soon as AutoMarket
                 launches.
</p>
</div>
           )}
           {/* Trust Badges */}

           {/* Social Proof */}
<div className="mt-5 flex flex-col items-center justify-center text-gray-300">
               Join 50+ car enthusiasts already waiting for launch.

</div>
</div>
</div>
</div>
</section>
 );
}
type CountdownCardProps = {
 value: string;
 label: string;
};
function CountdownCard({ value, label }: CountdownCardProps) {
 return (
<div className="group rounded-2xl border border-white/10 bg-black/40 p-6 text-center backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-black/60">
<h3 className="text-5xl font-bold tracking-tight text-white transition group-hover:scale-110">
       {value}
</h3>
<p className="mt-3 text-sm uppercase tracking-[0.3em] text-gray-400">
       {label}
</p>
</div>
 );
}

