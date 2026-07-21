# CoinTickR

> A real-time cryptocurrency analytics dashboard built with **Next.js 16**, featuring live market data, TradingView-style charts, WebSocket streaming, and a global command palette.

🌐 **Live Demo:** https://coin-tick-r.vercel.app

<img width="1470" height="911" alt="Screenshot 2026-07-21 at 6 07 30 PM" src="https://github.com/user-attachments/assets/ece52b73-a9e7-44bc-b801-df84ddc50cbe" />
<img width="1470" height="920" alt="Screenshot 2026-07-21 at 6 07 46 PM" src="https://github.com/user-attachments/assets/39f2998e-0d1d-44a1-b051-65a2b366a5e5" />
<img width="1470" height="924" alt="Screenshot 2026-07-21 at 6 08 25 PM" src="https://github.com/user-attachments/assets/95660e5c-c1c7-46ed-8c5a-80c2bccf5861" />
<img width="1455" height="902" alt="Screenshot 2026-07-21 at 6 08 39 PM" src="https://github.com/user-attachments/assets/f9c32c79-49f6-4c69-b58b-52f6be061a63" />

---

## ✨ Features

### 📈 Real-Time Market Data
- Live cryptocurrency prices via Binance WebSocket
- Real-time trade feed
- Live candlestick updates
- Automatic reconnection handling

### 📊 Interactive Charts
- TradingView-style candlestick charts
- Multiple timeframes (1D, 7D, 1M, 3M, 1Y)
- Smooth chart interactions
- Historical OHLC data

### 🪙 Market Analytics
- Trending cryptocurrencies
- Top gainers & losers
- Top market categories
- Live market statistics

### 🔍 Global Search
- **Cmd + K / Ctrl + K** command palette
- Instant coin search
- Keyboard-first navigation
- Linear/Vercel-inspired experience

### 💱 Coin Details
- Live price overview
- Market statistics
- Currency converter
- Exchange listings
- Recent trades

### 🎨 Modern UI
- Responsive design
- Dark mode interface
- Built with Tailwind CSS v4
- Smooth animations

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | Base UI + shadcn-inspired components |
| Charts | lightweight-charts (TradingView) |
| API | CoinGecko REST API |
| Real-time | Binance WebSocket |
| Deployment | Vercel |

---

# ⚡ Architecture

CoinTickR combines two different data sources to provide both rich market information and real-time updates.

### CoinGecko REST API
Used for:
- Trending coins
- Coin search
- Market statistics
- Categories
- Historical market data
- Exchange information

### Binance WebSocket
Used for:
- Live prices
- Live candlestick updates
- Trade stream
- High-frequency market updates

Since CoinGecko's free API doesn't provide WebSocket access, Binance's public streams are used for real-time updates while CoinGecko supplies the market metadata. The application abstracts both behind reusable hooks so components remain source-agnostic.

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/Muditgolaa/CoinTickR.git
cd CoinTickR
```

Install dependencies

```bash
npm install
```

Create an environment file

```env
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key
```

Start the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 📁 Project Structure

```
app/
components/
hooks/
lib/
services/
types/
public/
```

---

# ⭐ Highlights

- Server Components + Client Components
- WebSocket streaming
- Command Palette (Cmd/Ctrl + K)
- TradingView-style charts
- Responsive dashboard
- Optimized data fetching
- Type-safe API layer
- Modular architecture

---

# 📌 Future Improvements

- Watchlist
- Portfolio tracking
- Price alerts
- Authentication
- Theme customization
- Multi-exchange support
- WebSocket on all currency

---

# 📄 License

MIT License
