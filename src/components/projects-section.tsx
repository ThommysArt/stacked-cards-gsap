"use client"

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BGs = ["bg-emerald-500", "bg-amber-500", "bg-fuchsia-500", "bg-sky-500", "bg-neutral-300", "bg-stone-500"]

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(()=>{
        gsap.utils.toArray<HTMLDivElement>(".items-row").forEach((row, idx) => {
            const rowItems = row.querySelectorAll<HTMLDivElement>(".row-item")

            rowItems.forEach((item, index) => {
                gsap.set(item, {
                    y: 1000,
                    rotation: index % 2 === 0 ? -60 : 60,
                    transformOrigin: "center center"
                })
            })

            ScrollTrigger.create({
                trigger: row,
                start: "top 60%",
                scrub: true,
                onEnter: () => {
                    gsap.to(rowItems, {
                        y: 0,
                        rotation: 0,
                        duration: 1,
                        ease: "power4.out",
                        stagger: 0.25
                    })
                },
            })
        })

        const handleResize = () => {
            ScrollTrigger.refresh()
          }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, {
        scope: containerRef
    })

  return (
    <div ref={containerRef} className='w-full h-full flex flex-col gap-8'>
        {[...Array(6)].map((_,idx1) => (
            <div key={idx1} className='items-row h-full w-full flex gap-8'>
                {[...Array(2)].map((_,idx2) => (
                    <div key={idx2} className="row-item h-full w-full flex flex-col gap-4 will-change-transform">
                        <div className={`${BGs[idx1 % 6]} min-h-[30rem] h-full w-full aspect-[4/3] flex items-center justify-center rounded`}>
                            <p className="text-[10rem] font-semibold tracking-tighter">
                                Card {idx1*idx2}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl font-semibold tracking-tighter">
                                Card {idx1*idx2}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default ProjectsSection