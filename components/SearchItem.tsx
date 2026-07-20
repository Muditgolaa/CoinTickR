import Image from 'next/image'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatPercentage, cn } from '@/lib/utils'

const SearchItem = ({ coin, onSelect, isActiveName }: SearchItemProps) => {
  const rawChange = coin.data?.price_change_percentage_24h
  const change = typeof rawChange === 'number' ? rawChange : rawChange?.usd
  const hasChange = typeof change === 'number'
  const isTrendingUp = hasChange && change > 0

  return (
    <button
      type="button"
      onClick={() => onSelect(coin.id)}
      className={cn('search-item', { 'is-active': isActiveName })}
    >
      <div className="coin">
        <Image src={coin.large || coin.thumb} alt={coin.name} width={28} height={28} />
        <p className="name">
          {coin.name} <span className="symbol">({coin.symbol.toUpperCase()})</span>
        </p>
      </div>
      {coin.data?.price !== undefined && (
        <div className="stats">
          <p className="price">{formatCurrency(coin.data.price)}</p>
          {hasChange && (
            <Badge className={cn('badge', isTrendingUp ? 'badge-up' : 'badge-down')}>
              {isTrendingUp ? <TrendingUp /> : <TrendingDown />}
              {formatPercentage(change)}
            </Badge>
          )}
        </div>
      )}
    </button>
  )
}

export default SearchItem