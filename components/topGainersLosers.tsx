import Image from 'next/image'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, formatPercentage, cn } from '@/lib/utils'

interface TopGainersLosersProps {
  gainers: TopGainersLosers[]
  losers: TopGainersLosers[]
}

const TopGainersLosers = ({ gainers, losers }: TopGainersLosersProps) => {
  const renderList = (coins: TopGainersLosers[]) =>
    coins.map((coin) => {
      const isTrendingUp = coin.priceChangePercentage24h > 0
      return (
        <div key={coin.id} className="gl-card">
          <div className="coin">
            <Image src={coin.image} alt={coin.name} width={40} height={40} />
            <div className="info">
              <p className="name">{coin.name}</p>
              <p className="symbol">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="stats">
            <p className="price">{formatCurrency(coin.price)}</p>
            <Badge className={cn('badge', isTrendingUp ? 'badge-up' : 'badge-down')}>
              {isTrendingUp ? <TrendingUp /> : <TrendingDown />}
              {formatPercentage(coin.priceChangePercentage24h)}
            </Badge>
          </div>
        </div>
      )
    })

  return (
    <div id="top-gainers-losers">
      <Tabs defaultValue="gainers">
        <TabsList className="tabs-list">
          <TabsTrigger value="gainers" className="tabs-trigger">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers" className="tabs-trigger">Top Losers</TabsTrigger>
        </TabsList>
        <TabsContent value="gainers" className="tabs-content">
          {renderList(gainers)}
        </TabsContent>
        <TabsContent value="losers" className="tabs-content">
          {renderList(losers)}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TopGainersLosers