import React from 'react'
import { fetcher } from '@/lib/coingecko.action'
import Link from 'next/link'
import Image from 'next/image'
import DataTable from '@/components/ui/DataTable'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn, formatPercentage } from '@/lib/utils'

const TrendingCoins = async () => {
    let trendingCoins;

  try {
     trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300)
  }
    catch (error) {
    console.error('Failed to fetch trending coins:', error)
    return (
      <div id="trending-coins" className="flex flex-col items-center justify-center p-6 text-center text-red-500 border border-red-500/10 min-h-[200px]">
        <p className="font-semibold text-lg mb-1">Failed to load trending coins</p>
        <p className="text-xs text-purple-100/60 max-w-xs">There was an issue fetching the trending cryptocurrencies. Please try again later.</p>
      </div>
    )
  }

    const columns: DataTableColumn<TrendingCoin>[] = [
      {
        header: 'Name',
        cellClassName: 'name-cell',
        cell: (coin) => {
          const item = coin.item
          return (
            <Link href={`coins/${item.id}`} prefetch={false} className="flex items-center gap-2">
              <Image
                src={item.large}
                alt={item.name}
                width={36}
                height={36}
                className="rounded-full"
              />
              <p className="font-medium">{item.name}</p>
            </Link>
          )
        },
      },
      {
        header: '24h Change',
        cellClassName: 'name-cell',
        cell: (coin) => {
          const item = coin.item
          const isTrendingUp = item.data.price_change_percentage_24h.usd > 0
          return (
            <div
              className={cn(
                'price-change flex items-center gap-1 font-medium',
                isTrendingUp ? 'text-green-500' : 'text-red-500',
              )}
            >
              <p className="flex items-center"> 
                {formatPercentage(item.data.price_change_percentage_24h.usd)}
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
              </p>
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
              $
              {coin.item.data.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )
        },
      },
    ]
    return (
      <div id="trending-coins">
        <h4>Trending Coins</h4>
          <DataTable
            data={trendingCoins.coins.slice(0, 6) || []}
            columns={columns}
            rowKey={(coin) => coin.item.id}
            tableClassName="trending-coins-table"
            headerCellClassName="py-3!"
            bodyCellClassName="py-2!"
          />
      </div>
    )
  } 

export default TrendingCoins
