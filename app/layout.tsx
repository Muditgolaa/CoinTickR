import type { Metadata } from 'next'
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/ui/header'
import { fetcher } from '@/lib/coingecko.action'
import { SearchProvider } from '@/context/SearchContext'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CoinTickR',
  description: 'Real-Time Crypto Analytics Dashboard ',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let trendingCoins: SearchCoin[] = []
  try {
    const trending = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300)
    trendingCoins = trending.coins.map(({ item }) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      market_cap_rank: item.market_cap_rank,
      thumb: item.thumb,
      large: item.large,
      data: {
        price: item.data.price,
        price_change_percentage_24h: item.data.price_change_percentage_24h.usd,
      },
    }))
  } catch (error) {
    console.error('Failed to fetch trending coins for search:', error)
  }

  return (
    <html
      lang="en"
      className={cn(
        'dark',
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-mono',
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <SearchProvider>
          <Header trendingCoins={trendingCoins} />
          {children}
        </SearchProvider>
      </body>
    </html>
  )
}