"use client"

import React, { useRef } from 'react'
import ReactLenis from 'lenis/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { GPUSamplerBindingType } from 'three/src/renderers/webgpu/utils/WebGPUConstants.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

const BannerImg = "https://5xafggsn1z.ufs.sh/f/g5G8UI4CtAWNTtT7w6kB8OGDVLaeUJhPvxyAYsrQlZi6Rtzo"
const BannerImgNoBg = "https://5xafggsn1z.ufs.sh/f/g5G8UI4CtAWNNEyYBRfMB7WTLRsQJyErOZhiC83PFl6f4ezG"

const ImageLayers = () => {
    const container = useRef<HTMLDivElement>(null)

    useGSAP(()=>{
        const bannerConatiner = document.querySelector('.banner-img-container')
        const bannerIntroTextElements = document.querySelectorAll('.banner-intro-text')
        const bannerMaskLayers = gsap.utils.toArray<HTMLDivElement>(document.querySelectorAll('.mask'))

        const bannerHeader = document.querySelector('.banner-header h1')
        const splitText = new SplitText(bannerHeader, { type: "words" })
        const words = splitText.words
        gsap.set(words, { opacity: 0 })

        bannerMaskLayers.forEach((maskLayer, i) => {
            gsap.set(maskLayer, {
                scale: 0.9 - i * 0.15,
            })
        })
        gsap.set(bannerConatiner, { scale: 0 })

        ScrollTrigger.create({
            trigger: ".banner",
            start: "top top",
            end: `+=${window.innerHeight * 4}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress

                gsap.set(bannerConatiner, { scale: progress })

                bannerMaskLayers.forEach((maskLayer, i) => {
                    const initialScale = 0.9 - i * 0.15
                    const layerProgress = Math.min(progress / 0.9, 1.0)
                    const currentScale = initialScale + (1 - initialScale) * layerProgress

                    gsap.set(maskLayer, { scale: currentScale })
                })

                if (progress < 0.9) {
                    const textProgress = progress / 0.9
                    const moveDistance = window.innerWidth * 0.5

                    gsap.set(bannerIntroTextElements[0], { x: -moveDistance * textProgress })
                    gsap.set(bannerIntroTextElements[1], { x: moveDistance * textProgress })
                }

                if (progress >= 0.7 && progress <= 0.9) {
                    const headerProgress = (progress - 0.7) / (0.9 - 0.7)
                    const totalWords = words.length

                    words.forEach((word, i) => {
                        const wordStartDelay = i / totalWords
                        const wordEndDelay = (i + 1) / totalWords

                        let wordOpacity = 0

                        if (headerProgress >= wordEndDelay) {
                            wordOpacity = 1
                        } else if (headerProgress >= wordStartDelay) {
                            const wordProgress = (headerProgress - wordStartDelay) / (wordEndDelay - wordStartDelay)
                            wordOpacity = 1 - wordProgress
                        }

                        gsap.set(word, { opacity: wordOpacity })
                    })
                } else if (progress < 0.7) {
                    gsap.set(words, { opacity: 0 })
                } else if (progress > 0.9) {
                    gsap.set(words, { opacity: 1 })
                }
            }
        })
    }, {
        scope: container
    })
  return (
    <ReactLenis root>
        <div ref={container} className='w-full h-full text-[4rem] leading-[1.1]'>
            <section className='hero relative h-svh w-screen overflow-hidden flex items-center justify-center'>
                <h1 className="text-center w-1/2">The frame is just for show</h1>
            </section>
            <section className='banner relative h-svh w-screen overflow-hidden'>
                <div className='banner-img-container relative w-full h-full will-change-transform'>
                    <div className="img absolute top-0 left-0 w-full h-full will-change-transform">
                        <img className="w-full h-full will-change-transform" src={BannerImg} alt="" />
                    </div>
                    {[...Array(6)].map((_, i) => (
                        <div 
                            key={i} 
                            className="img mask absolute top-0 left-0 w-full h-full will-change-transform" 
                            style={{ 
                                WebkitMaskImage: `url(${BannerImgNoBg})`, 
                                maskImage: `url(${BannerImgNoBg})`, 
                                WebkitMaskSize: 'cover', 
                                maskSize: 'cover', 
                                WebkitMaskPosition: 'center', 
                                maskPosition: 'center', 
                                WebkitMaskRepeat: 'no-repeat', 
                                maskRepeat: 'no-repeat'
                                }}
                            >
                            <img className="w-full h-full will-change-transform" src={BannerImg} alt="" />
                        </div>
                    ))}

                    <div className="banner-header w-[75%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[2] text-black">
                        <h1>Stand With Confidence</h1>
                    </div>
                </div>

                <div className='banner-intro-text-container absolute top-1/2 -translate-y-1/2 w-full flex gap-[0.5rem] z-10'>
                    <div className="banner-intro-text flex flex-1 relative will-change-transform justify-end">
                        <h1>Surface</h1>
                    </div>
                    <div className="banner-intro-text flex-1 relative will-change-transform">
                        <h1>Layered</h1>
                    </div>
                </div>
            </section>
            <section className='outro relative h-svh w-screen overflow-hidden flex items-center justify-center'>
                <h1 className="text-center">That's the real thing</h1>
            </section>
        </div>
    </ReactLenis>
  )
}

export default ImageLayers