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

const categoriesSkeletonRows = Array.from({ length: 10 }, (_, i) => ({ id: i.toString() }))

const categoriesSkeletonColumns: DataTableColumn<{ id: string }>[] = [
  {
    header: 'Category',
    cellClassName: 'category-cell',
    cell: () => <div className="category-skeleton skeleton" />,
  },
  {
    header: 'Top Gainers',
    cell: () => (
      <div className="top-gainers-cell">
        <div className="coin-skeleton skeleton" />
        <div className="coin-skeleton skeleton" />
        <div className="coin-skeleton skeleton" />
      </div>
    ),
  },
  {
    header: '24h Change',
    cell: () => (
      <div className="change-cell">
        <div className="value-skeleton-sm skeleton" />
        <div className="change-icon skeleton" />
      </div>
    ),
  },
  {
    header: 'Market Cap',
    cellClassName: 'market-cap-cell',
    cell: () => <div className="value-skeleton-lg skeleton" />,
  },
  {
    header: '24h Volume',
    cellClassName: 'volume-cell',
    cell: () => <div className="value-skeleton-md skeleton" />,
  },
]

export const CategoriesFallback = () => {
  return (
    <div id="categories-fallback" className="animate-pulse">
      <h4>Top Categories</h4>
      <DataTable
        data={categoriesSkeletonRows}
        columns={categoriesSkeletonColumns}
        rowKey={(row) => row.id}
      />
    </div>
  )
}
