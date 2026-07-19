import React from 'react'
import { fetcher } from '@/lib/coingecko.action'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import { CoinOverviewFallback } from './fallback'
import CandlestickChart from '@/components/candlestickchart'

const CoinOverview = async () => {
  let coin;
  let coinOHLCData;
  try {
    const[coin,coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>('/coins/bitcoin', {
       dex_pair_format: 'symbol',
      }),
      fetcher<OHLCData[]>('/coins/bitcoin/ohlc',{
         vs_currency: 'usd',
         days: 1,
         precision:'full',
        }),
      ])
      return (
        <div id="coin-overview">
          <CandlestickChart data={coinOHLCData} coinId="bitcoin">

          <div className="header">
            <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
          </CandlestickChart>
        </div>
      )
    }
    catch (error) {
    console.error('Failed to fetch coin overview data:', error)
    return <CoinOverviewFallback/>
  }
  } 


export default CoinOverview
