import React from 'react'
import ReactLenis from "lenis/react"
import CardsScaleUp from '@/components/cards-scale-up'

const page = () => {
  return (
    <ReactLenis root>
      <div className='min-h-screen h-full w-full p-10'>
          <div className="h-[40vh] w-full" />
          <CardsScaleUp />
          <div className="h-[40vh] w-full" />
      </div>
    </ReactLenis>
  )
}

export default page