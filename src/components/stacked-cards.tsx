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
  image: string;
}

interface CardProps {
  service: Service;
  index: number;
}

// --- Data for the cards ---
const services: Service[] = [
  {
    title: 'Brand Identity',
    description: "Crafting a unique and memorable brand presence that resonates with your audience.",
    details: [
      'Logo & Visual System',
      'Brand Guidelines',
      'Story & Messaging',
    ],
    color: '#d4e3ff',
    textColor: '#0f172a',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // branding/identity
  },
  {
    title: 'MVP Building',
    description: "Rapidly building and launching your Minimum Viable Product to validate your idea.",
    details: [
      'Lean Product Strategy',
      'Prototype & MVP Development',
      'User Feedback Loops',
    ],
    color: '#ffebd4',
    textColor: '#0f172a',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80', // mvp/building
  },
  {
    title: 'Web Design',
    description: "Designing beautiful, functional, and responsive websites for your business.",
    details: [
      'UI/UX Design',
      'Responsive Layouts',
      'Web Animation',
    ],
    color: '#ffe0e0',
    textColor: '#0f172a',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', // web design
  },
  {
    title: 'Mobile Apps',
    description: "Creating intuitive and engaging mobile experiences for iOS and Android.",
    details: [
      'iOS & Android',
      'Cross-platform',
      'App Store Launch',
    ],
    color: '#d1f7d1',
    textColor: '#0f172a',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', // mobile apps
  },
  {
    title: 'Revamps',
    description: "Redesigns, restructures, and re-architecture to modernize and optimize your product.",
    details: [
      'UI/UX Redesign',
      'Code Refactoring',
      'Performance Optimization',
    ],
    color: '#e0e7ff',
    textColor: '#0f172a',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=600&q=80', // revamp
  },
];


// --- The Card Component ---
// This component represents a single card in the stack.
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ service, index }, ref) => (
  <div ref={ref} className="h-[60vh] w-full sticky top-0 overflow-hidden">
    <div 
      className="w-full h-full grid grid-cols-2 p-8 md:p-12 lg:p-20"
      style={{ backgroundColor: service.color, color: service.textColor }}
    >
      {/* Left: Text content */}
      <div className="flex flex-col justify-between h-full flex-1 pr-8">
        <div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
            {service.title}
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">{service.description}</p>
        </div>
        <div className="flex-shrink-0 flex justify-end text-right mt-8">
          <ul className="text-md md:text-lg">
            {service.details.map((detail: string, i: number) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Right: Image */}
      <div className="flex items-center justify-center h-full flex-shrink-0" style={{ width: '200px' }}>
        <img src={service.image} alt={service.title + ' image'} className="max-h-[80%] max-w-full object-contain" />
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
    <div className="bg-gray-100 font-sans">
      {/* Main container for our animation */}
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
    </div>
  );
}
