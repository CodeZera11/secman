import { PageRoutes } from '@/constants/page-routes'
import { Button } from '@repo/ui/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

const HeroSection = () => {
  return (
    <section className="h-full primary-gradient relative overflow-hidden pt-16 flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-neutral-50">
          Secman
        </h1>
        <p className="text-xl text-neutral-400 mb-8 max-w-3xl mx-auto">
          Secman is a CLI tool to manage your environment secrets and keep them secure.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className='fancy-button' asChild>
            <Link href={PageRoutes.PROTECTED.DASHBOARD}>
              Get Started
              <BsArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection