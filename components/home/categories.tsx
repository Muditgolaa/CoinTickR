import { fetcher } from "@/lib/coingecko.action"
import DataTable from "@/components/ui/DataTable"
import Image from "next/image"
import {formatCompactCurrency, formatPercentage} from '@/lib/utils'
import { TrendingUp,TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = async () => {
    const categories = await fetcher<Category[]>('/coins/categories')
    const columns: DataTableColumn<Category>[] = [
        {header: 'Category',cellClassName:'category-cell',cell: (category)=> category.name},
        {
            header:'Top Gainers',
            cell: (category)=>
                <div className="top-gainers-cell">
                  {category.top_3_coins.map((coin)=>(
                    <Image src={coin} alt={coin} key={coin} width={28} height={28}/>
                  ))}
                </div>,
    },
    {
        header: '24h Change',
        cell: (category) => {
          const isTrendingUp = category.market_cap_change_24h > 0
          return (
            <div
              className={cn('change-cell',
                isTrendingUp ? 'text-green-500' : 'text-red-500',
            )}
            >
                <p className="flex items-center">
            {formatPercentage(category.market_cap_change_24h)}
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
        header: 'Market Cap',
        cellClassName: 'market-cap-cell',
        cell: (category)=> formatCompactCurrency(category.market_cap)
    },
    {
        header: '24h Volume',
        cellClassName: 'volume-cell',
        cell: (category)=> formatCompactCurrency(category.volume_24h)
    },

    
    ]
    return <div id="categories" className="custom-scrollbar">
        <h4>Top Categories</h4>
        <DataTable 
        columns={columns} 
        data={categories?.slice(0,10)} 
        rowKey={(_,index)=>index} 
        tableClassName="mt-3"/>
    </div>
    
}

export default categories