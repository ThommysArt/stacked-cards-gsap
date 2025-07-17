"use client"

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// It's important to register the plugin before use
gsap.registerPlugin(ScrollTrigger);

// --- Type definitions ---
interface Service {
  title: string;
  description: string;
  details: string[];
  color: string;
  textColor: string;
}

interface CardProps {
  service: Service;
  index: number;
}

// --- Data for the cards ---
const services: Service[] = [
  {
    title: 'Brand Strategy',
    description: "It's the core of your company's identity.",
    details: [
      'Research & Insights',
      'Unique Value Proposition',
    ],
    color: '#d4e3ff', // Light Blue
    textColor: '#0f172a',
  },
  {
    title: 'Visual Identity',
    description: 'Visual identity is the unique visual language of your brand, creating memorable impressions and emotional connections with your audience.',
    details: [
      'Logotype, Typography & Colour',
      'Illustration & 3D',
      'Photography Art Direction',
      'Brand Book & Guidelines',
      'Animations',
    ],
    color: '#ffebd4', // Light Orange
    textColor: '#0f172a',
  },
  {
    title: 'Website',
    description: 'Our website design services blend innovation and creativity to deliver user-centric solutions that elevate your brand and engage your audience.',
    details: [
        'UX Design',
        'User Testing',
        'Product Prototype',
        'Mobile UI',
        'Software UI design',
    ],
    color: '#ffe0e0', // Light Red
    textColor: '#0f172a',
  },
  {
    title: 'Product',
    description: 'Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market.',
    details: [
        'UX Design',
        'User Testing',
        'Product Prototype',
        'Mobile UI',
        'Software UI design',
        'Web app design',
        'Interaction design',
    ],
    color: '#d1f7d1', // Light Green
    textColor: '#0f172a',
  },
];


// --- The Card Component ---
// This component represents a single card in the stack.
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ service, index }, ref) => (
  <div ref={ref} className="h-screen w-full sticky top-0 overflow-hidden">
    <div 
      className="w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-20"
      style={{ backgroundColor: service.color, color: service.textColor }}
    >
      {/* Top section of the card */}
      <div className="flex-grow flex items-start">
        <div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
            {service.title}
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">{service.description}</p>
        </div>
      </div>
      
      {/* Bottom section of the card */}
      <div className="flex-shrink-0 flex justify-end text-right">
        <ul className="text-md md:text-lg">
          {service.details.map((detail: string, i: number) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
));


// --- Main App Component ---
// This is where the magic happens with GSAP and ScrollTrigger
export default function StackedCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // We use useLayoutEffect for animations to avoid flicker, as it runs
  // after the DOM has been painted but before the browser has had a chance
  // to paint the screen.
  useLayoutEffect(() => {
    // Create a GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // The core of the animation.
      // We loop through each card except the last one.
      cardRefs.current.slice(0, -1).forEach((card, index) => {
        // The animation will target the current card in the loop.
        const targetCard = card;
        // The trigger for the animation will be the *next* card.
        const triggerCard = cardRefs.current[index + 1];
        
        // Create a ScrollTrigger for each card.
        ScrollTrigger.create({
          trigger: triggerCard, // Animation starts when the top of this card hits the top of the viewport
          start: 'top top',
          
          // The animation for the target card is defined in the `animation` property.
          animation: gsap.to(targetCard, {
            // We scale it down slightly.
            scale: 0.9,
            // We can also add a slight y-movement for more depth.
            y: '-5vh',
            // We ease the animation for a smoother effect.
            ease: 'power1.inOut',
          }),
          scrub: 1, // This makes the animation scrubbable and linked to the scroll position.
          pin: true, // We pin the trigger card while the animation is active.
          pinSpacing: false, // Avoids adding extra space after the pin.
        });
      });
    }, containerRef); // Scope the context to our main container

    // Cleanup function to revert all animations and kill ScrollTriggers
    // when the component unmounts. This is crucial for React.
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="bg-gray-100 font-sans">
        {/* This is a simple header. The animation container starts below it. */}
        <header className="p-4 text-center text-gray-500">
          <h1 className="text-2xl font-bold">Scroll Down To See The Animation</h1>
          <p>A card stacking animation with React, GSAP & Tailwind CSS</p>
        </header>

        {/* This is the main container for our animation */}
        <div ref={containerRef}>
          {services.map((service, index) => (
            <Card
              key={index}
              service={service}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              }}
              index={index}
            />
          ))}
        </div>

        {/* This is a simple footer to show the end of the scroll area. */}
        <footer className="h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold">End of Section</h2>
            <p>The animation is complete.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
