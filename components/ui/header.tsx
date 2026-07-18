'use client'

import Link from 'next/link'
import React from 'react'
import {usePathname} from 'next/navigation'
import { cn } from '@/lib/utils'

const Header = () => {
    const pathname = usePathname()
  return (
    <header>
        <div className="main-container inner">
            <Link href="/">
                <img src="cointickr_logo.svg" alt="logo" width={132} height={20}/>
            </Link>
            <nav>
                <Link href="/" className={cn('nav-link',{'is-active': pathname === '/','is-home': true})}>Home</Link>
                <p>Search Model</p>
                <Link href="/coins" className={cn('nav-link',{'is-active': pathname === '/coins',})}>All Coins</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header