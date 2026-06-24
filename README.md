# 🌾 Mazao Market Monitor

A real-time agricultural commodity price aggregator for East African markets, built to empower farmers with up-to-date market intelligence.

## Description

Mazao Market Monitor is a TypeScript/React web application that displays and tracks agricultural commodity prices across major markets in Kenya, Tanzania, and Uganda. The name "Mazao" means "crops" in Swahili, reflecting the platform's focus on supporting smallholder farmers across East Africa.

## Features

- 📊 **Live Price Tracking** – Prices auto-refresh every 15 seconds with realistic fluctuations
- 🌍 **Multi-Country Coverage** – Kenya, Tanzania, and Uganda markets
- 🔍 **Search & Filter** – Search by commodity or market name, filter by country
- 📈 **Price Change Indicators** – Visual rising/falling indicators with percentage changes
- 📉 **Market Summary** – Dashboard stats showing average change, rising, and falling prices
- 🔄 **Manual Refresh** – Instant refresh button for on-demand updates
- 📱 **Responsive Layout** – Works on desktop and mobile browsers
- 🌿 **Commodities Tracked** – Maize, Beans, Rice, Tomatoes, Potatoes, Sorghum, Wheat, Coffee, Tea, Cassava, Sweet Potato, Millet

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- Inline styles (no external CSS dependencies)

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mazao-market-monitor-20260624.git
cd mazao-market-monitor-20260624

# Install dependencies
npm install
```

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
mazao-market-monitor-20260624/
├── App.tsx          # Main application component
├── index.html       # HTML entry point
├── main.tsx         # React DOM entry (if separate)
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── vite.config.ts   # Vite configuration
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## Data

Currently uses simulated market data based on realistic East African commodity price ranges. Future versions will integrate with real APIs such as RATIN (Regional Agricultural Trade Intelligence Network) and national market information systems.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License © 2026 Mazao Market Monitor