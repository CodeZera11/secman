import { Button } from '@repo/ui/components/ui/button'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

const HeroSection = () => {
  return (
    // <section id="hero" className="h-full primary-gradient relative overflow-hidden pt-16">
    //   <div className="absolute inset-0 "></div>
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
    //     <div className="grid md:grid-cols-2 gap-12 items-center">
    //       <div className="text-white space-y-6">
    //         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
    //           Find Your Perfect <span className="text-blue-500">Property</span> With Ease
    //         </h1>
    //         <p className="text-gray-300 text-lg md:text-xl">
    //           List your property or find your next home using our innovative key system. Simple, secure, and hassle-free.
    //         </p>
    //         <div className="flex flex-col sm:flex-row gap-4">
    //           <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
    //             List Property
    //           </button>
    //           <button className="bg-neutral-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-neutral-700 transition duration-300 transform hover:scale-105">
    //             Search Properties
    //           </button>
    //         </div>
    //         <div className="flex items-center gap-6 pt-4">
    //           <div className="flex items-center">
    //             <span className="text-3xl font-bold text-blue-500">1000+</span>
    //             <span className="ml-2 text-gray-300">Properties Listed</span>
    //           </div>
    //           <div className="flex items-center">
    //             <span className="text-3xl font-bold text-blue-500">500+</span>
    //             <span className="ml-2 text-gray-300">Happy Customers</span>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="relative">
    //         {/* Add an image or additional content */}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="h-full primary-gradient relative overflow-hidden pt-16 flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-neutral-50">
          Jumpstart Your Web Projects
        </h1>
        <p className="text-xl text-neutral-400 mb-8 max-w-3xl mx-auto">
          Web Toolbox: A comprehensive starter kit featuring Next.js, NestJS, Prisma, shadcn/ui, NextAuth, and more. Build robust, scalable web applications in record time.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className='fancy-button'>
            Get Started
            <BsArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg">Learn More</Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection