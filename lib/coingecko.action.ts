'use server'

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL!
const API_KEY = process.env.COINGECKO_API_KEY!

if (!BASE_URL) throw new Error('Please provide COINGECKO_BASE_URL')
if (!API_KEY) throw new Error('Please provide COINGECKO_API_KEY')

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  )

  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  })

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}))
    const message =
      typeof errorBody.error === 'string'
        ? errorBody.error
        : errorBody.error?.status?.error_message || response.statusText

    throw new Error(`API error: ${response.status}: ${message}`)
  }

  return response.json()
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null
): Promise<PoolData> {
  const fallback: PoolData = {
    id: "",
    address: "",
    name: "",
    network: "",
  };

  if (network && contractAddress) {
    try{
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`
      );
  
      return poolData.data?.[0] ?? fallback;
    } catch(error){
      console.log(error)
      return fallback
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>(
      "/onchain/search/pools",
      { query: id }
    );

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getTopGainersLosers(limit = 4): Promise<{
  gainers: TopGainersLosers[]
  losers: TopGainersLosers[]
}> {
  const coins = await fetcher<CoinMarketData[]>('/coins/markets', {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 250,
    page: 1,
    price_change_percentage: '24h',
  })

  const normalized: TopGainersLosers[] = coins
    .filter(
      (coin) =>
        coin.price_change_percentage_24h !== null &&
        coin.price_change_percentage_24h !== undefined,
    )
    .map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      priceChangePercentage24h: coin.price_change_percentage_24h,
    }))

  const sorted = [...normalized].sort(
    (a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h,
  )

  return {
    gainers: sorted.slice(0, limit),
    losers: sorted.slice(-limit).reverse(),
  }
}