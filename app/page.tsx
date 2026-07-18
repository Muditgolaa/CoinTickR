import React from 'react'
import Image from 'next/image'
import DataTable from '@/components/ui/DataTable'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

const dummyTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap_rank: 1,
      thumb: '/logo.svg',
      large: '/logo.svg',
      data: {
        price: 64483.00,
        price_change_percentage_24h: {
          usd: 2.5
        }
      }
    }
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      market_cap_rank: 2,
      thumb: '/converter.svg',
      large: '/converter.svg',
      data: {
        price: 3450.50,
        price_change_percentage_24h: {
          usd: -1.2
        }
      }
    }
  },
  {
    item: {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      market_cap_rank: 5,
      thumb: '/logo.svg',
      large: '/logo.svg',
      data: {
        price: 145.20,
        price_change_percentage_24h: {
          usd: 5.8
        }
      }
    }
  }
]

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      return (
        <Link href={`coins/${item.id}`} className="flex items-center gap-2">
          <Image src={item.large} alt={item.name} width={36} height={36} className="rounded-full" />
          <p className="font-medium">{item.name}</p>
        </Link>
      )
    },
  },
  {
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
      return (
        <div className={cn('price-change flex items-center gap-1 font-medium', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          {isTrendingUp ? (
            <TrendingUp width={16} height={16} />
          ) : (
            <TrendingDown width={16} height={16} />
          )}
          <span>{Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%</span>
        </div>
      )
    },
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => {
      return (
        <p className="font-semibold">
          ${coin.item.data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      )
    }
  },
]

const page = () => {
  return <main className="main-container">
    <section className="home-grid">
      <div id="coin-overview">
        <div className="header">
          <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin" width={56} height={56} />
          <div className="info">
            <p>BitCoin / BTC</p>
            <h1>$64,483.00</h1>
          </div>
        </div>
      </div>
      <p>Trending Coins</p>
      <DataTable
        data={dummyTrendingCoins}
        columns={columns}
        rowKey={(coin) => coin.item.id}
      />
    </section>
    <section className="w-full mt-7 space-y-4">
      <p>Categories</p>
    </section>
  </main>
}

export default page