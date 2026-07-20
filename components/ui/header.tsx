'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/SearchContext'
import CommandPalette from '@/components/CommandPalette'

const Header = ({ trendingCoins = [] }: HeaderProps) => {
  const pathname = usePathname()
  const { open } = useSearch()

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="/log.svg" alt="logo" width={132} height={20} />
        </Link>
        <nav>
          <Link href="/" className={cn('nav-link', { 'is-active': pathname === '/', 'is-home': true })}>
            Home
          </Link>
          <button type="button" onClick={open} className="nav-link">
            Search
          </button>
          <Link href="/coins" className={cn('nav-link', { 'is-active': pathname === '/coins' })}>
            All Coins
          </Link>
        </nav>
      </div>
      <CommandPalette trendingCoins={trendingCoins} />
    </header>
  )
}

export default Header