import React from 'react'
import { fetcher } from '@/lib/coingecko.action'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'

const CoinOverview = async () => {
  let coin;
  try {
     coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol',
    })}
    catch (error) {
    console.error('Failed to fetch coin overview data:', error)
    return (
      <div id="coin-overview" className="flex flex-col items-center justify-center p-6 text-center text-red-500 border border-red-500/10 min-h-[200px]">
        <p className="font-semibold text-lg mb-1">Failed to load overview data</p>
        <p className="text-xs text-purple-100/60 max-w-xs">There was an issue fetching the Bitcoin pricing data. Please try again later.</p>
      </div>
    )
  }
    return (
      <div id="coin-overview">
        <div className="header">
          <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </div>
    )
  } 


export default CoinOverview
