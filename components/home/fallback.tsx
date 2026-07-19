import React from 'react'
import DataTable from '@/components/ui/DataTable'

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback" className="animate-pulse">
      <div className="header">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
      <div className="flex gap-2 my-4">
        <div className="period-button-skeleton skeleton" />
        <div className="period-button-skeleton skeleton" />
        <div className="period-button-skeleton skeleton" />
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  )
}

export const TrendingCoinsFallback = () => {
  const dummyData = Array.from({ length: 6 }, (_, i) => ({ id: i.toString() }))

  const columns: DataTableColumn<{ id: string }>[] = [
    {
      header: 'Name',
      cell: () => (
        <div className="name-link animate-pulse">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cell: () => (
        <div className="price-change animate-pulse">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: 'Price',
      cell: () => (
        <div className="price-line skeleton animate-pulse" />
      ),
    },
  ]

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        data={dummyData}
        columns={columns}
        rowKey={(item) => item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  )
}
