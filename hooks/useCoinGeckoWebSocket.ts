'use client'

import { useEffect, useRef, useState } from 'react'

const BINANCE_WS_BASE = 'wss://stream.binance.com:9443/stream'

export const useCoinGeckoWebSocket = ({
    symbol,
    liveInterval = '1m',
}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
    const wsRef = useRef<WebSocket | null>(null)
    const [price, setPrice] = useState<ExtendedPriceData | null>(null)
    const [trades, setTrades] = useState<Trade[]>([])
    const [ohlcv, setOhlcv] = useState<OHLCData | null>(null)
    const [isWsReady, setIsWsReady] = useState(false)

    useEffect(() => {
        setPrice(null)
        setTrades([])
        setOhlcv(null)
        setIsWsReady(false)

        if (!symbol) return

        const pair = `${symbol.toLowerCase()}usdt`
        const streams = [`${pair}@ticker`, `${pair}@trade`, `${pair}@kline_${liveInterval}`].join('/')
        const ws = new WebSocket(`${BINANCE_WS_BASE}?streams=${streams}`)
        wsRef.current = ws

        ws.onopen = () => setIsWsReady(true)
        ws.onclose = () => setIsWsReady(false)
        ws.onerror = (error) => {
            console.error('WebSocket error:', error)
            setIsWsReady(false)
        }
        ws.onmessage = (event) => {
            const { stream, data } = JSON.parse(event.data)

            if (stream.endsWith('@ticker')) {
                setPrice({
                    usd: Number(data.c ?? 0),
                    coin: data.s,
                    price: Number(data.c ?? 0),
                    change24h: Number(data.P ?? 0),
                    volume24h: Number(data.q ?? 0),
                    timestamp: data.E,
                })
            }

            if (stream.endsWith('@trade')) {
                const newTrade: Trade = {
                    price: Number(data.p ?? 0),
                    amount: Number(data.q ?? 0),
                    value: Number(data.p ?? 0) * Number(data.q ?? 0),
                    timestamp: data.T,
                    type: data.m ? 's' : 'b',
                }
                setTrades((prev) => [newTrade, ...prev].slice(0, 7))
            }

            if (stream.includes('@kline_')) {
                const k = data.k
                const candle: OHLCData = [
                    k.t,
                    Number(k.o ?? 0),
                    Number(k.h ?? 0),
                    Number(k.l ?? 0),
                    Number(k.c ?? 0),
                ]
                setOhlcv(candle)
            }
        }

        return () => ws.close()
    }, [symbol, liveInterval])

    return {
        price,
        trades,
        ohlcv,
        isConnected: isWsReady,
    }
}
