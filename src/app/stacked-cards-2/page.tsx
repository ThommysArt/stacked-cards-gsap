"use client"

import StackedCards2 from "@/components/stacked-cards-2";
import ReactLenis from "lenis"

export default function Home() {
  return (
    <StackedCards2 items={[Card1, Card2, Card3, Card4, Card5]} />
  );
}


const Card1 = () => {
  return (
    <div className="h-screen w-screen bg-amber-500 flex items-center justify-center">
      <p className="text-[18rem] font-semibold tracking-tighter">
        Card1
      </p>
    </div>
  )
}

const Card2 = () => {
  return (
    <div className="h-screen w-screen bg-fuchsia-500 flex items-center justify-center">
      <p className="text-[18rem] font-semibold tracking-tighter">
        Card2
      </p>
    </div>
  )
}

const Card3 = () => {
  return (
    <div className="h-screen w-screen bg-indigo-500 flex items-center justify-center">
      <p className="text-[18rem] font-semibold tracking-tighter">
        Card3
      </p>
    </div>
  )
}

const Card4 = () => {
  return (
    <div className="h-screen w-screen bg-sky-500 flex items-center justify-center">
      <p className="text-[18rem] font-semibold tracking-tighter">
        Card4
      </p>
    </div>
  )
}

const Card5 = () => {
  return (
    <div className="h-screen w-screen bg-emerald-500 flex items-center justify-center">
      <p className="text-[18rem] font-semibold tracking-tighter">
        Card5
      </p>
    </div>
  )
}