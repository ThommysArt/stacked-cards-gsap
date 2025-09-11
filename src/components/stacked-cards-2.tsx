"use client"

import React, {useRef, useEffect} from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)
 
interface StackedCards2Props {
    items: (()=>React.JSX.Element)[]
}

const StackedCards2 = ({ items }: StackedCards2Props) => {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(()=> {
        const stickyCards = document.querySelectorAll(".sticky-card")

        stickyCards.forEach((card, index)=>{
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false
                })
            }

            if (index < stickyCards.length -1) {
                ScrollTrigger.create({
                    trigger: stickyCards[index+1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress
                        const scale = 1 - progress * 0.25
                        const rotation = (index % 2 === 0 ? 5 : -5) * progress

                        gsap.set(card, {
                            scale: scale,
                            rotation,
                        })

                        const overlay = card.querySelector(".overlay")
                        gsap.set(overlay, {
                            opacity: progress
                        })
                    }
                })
            }
        })
    }, { scope: container})

    return (
        <div ref={container} className='relative w-full h-full'>
            {items.map((Item, index)=>(
                <div key={index} className='sticky-card relative h-full w-full will-change-transform' >
                    <Item />
                    <div className='overlay absolute top-0 left-0 z-2 w-full h-full bg-black/50 opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none' />
                </div>
            ))}
        </div>
    )
}

export default StackedCards2