import ProjectsSection from '@/components/projects-section'
import React from 'react'
import ReactLenis from "lenis/react"

const page = () => {
  return (
    <ReactLenis root>
      <div className='min-h-screen h-full w-full p-10'>
          <div className="h-[40vh] w-full" />
          <ProjectsSection />
          <div className="h-[40vh] w-full" />
      </div>
    </ReactLenis>
  )
}

export default page