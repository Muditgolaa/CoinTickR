'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@base-ui/react'
import { useSearch } from '@/context/SearchContext'
import { searchCoins } from '@/lib/coingecko.action'
import SearchItem from '@/components/SearchItem'

const CommandPalette = ({ trendingCoins = [] }: { trendingCoins?: SearchCoin[] }) => {
  const { isOpen, close } = useSearch()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchCoin[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const list: SearchItemCoin[] = query.trim() ? results : trendingCoins

  const handleSelect = (coinId: string) => {
    close()
    router.push(`/coins/${coinId}`)
  }

  // Reset + autofocus whenever the palette opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const timeout = setTimeout(async () => {
      const coins = await searchCoins(query)
      setResults(coins)
      setActiveIndex(0)
    }, 300)
    return () => clearTimeout(timeout)
  }, [query])

  // Esc + arrow-key navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, list.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && list[activeIndex]) {
        handleSelect(list[activeIndex].id)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, list, activeIndex])

  // Outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, close])

  return (
    <div id="command-palette" data-state={isOpen ? 'open' : 'closed'}>
      <div className="overlay" />
      <div className="panel" ref={panelRef}>
        <div className="search-row">
          <SearchIcon className="search-icon" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a token by name or symbol"
            className="search-input"
          />
          <button type="button" className="search-button" onClick={() => setQuery((q) => q)}>
            <SearchIcon size={16} />
            Search 
          </button>
        </div>
        <p className="list-label">{query.trim() ? 'Search results' : 'Trending assets'}</p>
        <div className="results">
          {list.length === 0 && <p className="empty">No results found</p>}
          {list.map((coin, index) => (
            <SearchItem
              key={coin.id}
              coin={coin}
              onSelect={handleSelect}
              isActiveName={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette