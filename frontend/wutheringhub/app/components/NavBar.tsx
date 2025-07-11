'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClasses = clsx(
    'fixed top-0 left-0 w-full z-50 bg-neutral-950',
    {
      'border-b border-gray-700 dark:border-gray-700': scrolled,
      'border-b-0': !scrolled,
    }
  )

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          WutheringHub
        </Link>
        <div className="flex space-x-6">
          <Link href={"/about"} className="px-3 py-1 rounded-md font-semibold bg-transparent border-1 border-neutral-700 hover:bg-neutral-800">
            About
          </Link>
          <Link href="/login" className="px-3 py-1 rounded-md font-semibold bg-neutral-700 hover:bg-neutral-800">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  )
}
