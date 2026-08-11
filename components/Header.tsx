'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/support', label: 'Support' },
  ]

  return (
    <header className="container-custom py-6 flex flex-col items-center gap-4">
      {/* Logo - centered */}
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
        <img 
          src="/logo_with_name.png" 
          alt="Refero" 
          className="h-14 w-auto md:h-16"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </Link>
      
      {/* Navigation - centered below logo */}
      <nav className="flex items-center gap-6 text-white text-sm md:text-base">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-primary-400 transition-colors ${
              pathname === link.href ? 'text-primary-400 font-medium' : 'text-white/70'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}