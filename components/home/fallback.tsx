import React from 'react'
import DataTable from '@/components/ui/DataTable'

const periods: Period[] = ['daily', 'weekly', 'monthly', '3months', '6months', 'yearly', 'max']

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="skeleton header-image" />
        <div className="info">
          <div className="skeleton header-line-sm" />
          <div className="skeleton header-line-lg" />
        </div>
      </div>
      <div className="flex gap-2">
        {periods.map((period) => (
          <div key={period} className="skeleton period-button-skeleton" />
        ))}
      </div>
      <div className="chart">
        <div className="skeleton chart-skeleton" />
      </div>
    </div>
  )
}

const trendingCoinsSkeletonRows = Array.from({ length: 6 }, (_, i) => ({ id: i }))

const trendingCoinsSkeletonColumns: DataTableColumn<{ id: number }>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: () => (
      <div className="name-link">
        <div className="skeleton name-image" />
        <div className="skeleton name-line" />
      </div>
    ),
  },
  {
    header: '24h Change',
    cellClassName: 'change-cell',
    cell: () => (
      <div className="price-change">
        <div className="skeleton change-icon" />
        <div className="skeleton change-line" />
      </div>
    ),
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: () => <div className="skeleton price-line" />,
  },
]

export const TrendingCoinsFallback = () => {
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        data={trendingCoinsSkeletonRows}
        columns={trendingCoinsSkeletonColumns}
        rowKey={(row) => row.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  )
}
