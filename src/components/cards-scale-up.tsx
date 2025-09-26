"use client"

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BGs = ["bg-emerald-500", "bg-amber-500", "bg-fuchsia-500", "bg-sky-500", "bg-neutral-300", "bg-stone-500", "bg-indigo-500", "bg-red-500"]

const CardsScaleUp = () => {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(()=>{
        gsap.utils.toArray<HTMLDivElement>(".card-item").forEach((item, idx) => {
            const itemImg = item.querySelector<HTMLDivElement>(".card-img")

            ScrollTrigger.create({
                trigger: item,
                start: "top 40%",
                end: "bottom top",
                onUpdate: (self) => {
                    const cardHeight = (30 * self.progress)
                    gsap.set(itemImg, {
                        height: `${cardHeight}rem`
                    })
                }
            })
        })

        const handleResize = () => {
            ScrollTrigger.refresh()
          }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, {
        scope: container
    })

  return (
    <div ref={container} className='flex flex-col h-full w-full'>
        {[...Array(8)].map((_, idx) => (
            <div key={idx} className='card-item container h-full w-full grid grid-cols-2 items-end gap-8 p-8 border-b'>
                <p className="card-text text-[5rem] font-semibold tracking-tighter">
                    Card {idx+1}
                </p>
                <div className={`card-img ${BGs[idx]} h-[10rem] aspect-[4/3] flex items-center justify-center rounded`}>
                    {/* <p className="text-[8rem] font-semibold tracking-tighter">
                        Card {idx}
                    </p> */}
                </div>
            </div>
        ))}
    </div>
  )
}

export default CardsScaleUp