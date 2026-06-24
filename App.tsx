import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

interface CommodityPrice {
  id: string;
  commodity: string;
  market: string;
  country: string;
  price: number;
  unit: string;
  currency: string;
  change: number;
  lastUpdated: string;
}

const MOCK_DATA: CommodityPrice[] = [
  { id: '1', commodity: 'Maize', market: 'Wakulima Market', country: 'Kenya', price: 4200, unit: '90kg bag', currency: 'KES', change: 2.3, lastUpdated: new Date().toISOString() },
  { id: '2', commodity: 'Beans', market: 'Kariakoo Market', country: 'Tanzania', price: 3800, unit: '90kg bag', currency: 'TZS', change: -1.5, lastUpdated: new Date().toISOString() },
  { id: '3', commodity: 'Rice', market: 'Owino Market', country: 'Uganda', price: 2900, unit: '50kg bag', currency: 'UGX', change: 0.8, lastUpdated: new Date().toISOString() },
  { id: '4', commodity: 'Tomatoes', market: 'City Park Market', country: 'Kenya', price: 120, unit: 'kg', currency: 'KES', change: 5.2, lastUpdated: new Date().toISOString() },
  { id: '5', commodity: 'Potatoes', market: 'Nakasero Market', country: 'Uganda', price: 1500, unit: '50kg bag', currency: 'UGX', change: -3.1, lastUpdated: new Date().toISOString() },
  { id: '6', commodity: 'Sorghum', market: 'Arusha Market', country: 'Tanzania', price: 1200, unit: '50kg bag', currency: 'TZS', change: 1.9, lastUpdated: new Date().toISOString() },
  { id: '7', commodity: 'Wheat', market: 'Eldoret Market', country: 'Kenya', price: 3600, unit: '90kg bag', currency: 'KES', change: -0.7, lastUpdated: new Date().toISOString() },
  { id: '8', commodity: 'Coffee', market: 'Moshi Market', country: 'Tanzania', price: 8500, unit: '50kg bag', currency: 'TZS', change: 4.1, lastUpdated: new Date().toISOString() },
  { id: '9', commodity: 'Tea', market: 'Kericho Market', country: 'Kenya', price: 280, unit: 'kg', currency: 'KES', change: 2.0, lastUpdated: new Date().toISOString() },
  { id: '10', commodity: 'Cassava', market: 'Gulu Market', country: 'Uganda', price: 800, unit: '50kg bag', currency: 'UGX', change: -2.4, lastUpdated: new Date().toISOString() },
  { id: '11', commodity: 'Sweet Potato', market: 'Kisumu Market', country: 'Kenya', price: 1800, unit: '90kg bag', currency: 'KES', change: 3.5, lastUpdated: new Date().toISOString() },
  { id: '12', commodity: 'Millet', market: 'Dodoma Market', country: 'Tanzania', price: 1100, unit: '50kg bag', currency: 'TZS', change: 0.5, lastUpdated: new Date().toISOString() },
];

function simulatePrice(base: number): number {
  const fluctuation = (Math.random() - 0.5) * 0.02 * base;
  return Math.round(base + fluctuation);
}

const App: React.FC = () => {
  const [prices, setPrices] = useState<CommodityPrice[]>(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [sortBy, setSortBy] = useState<'commodity' | 'price' | 'change'>('commodity');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refreshPrices = useCallback(() => {
    setPrices(prev => prev.map(item => {
      const newPrice = simulatePrice(item.price);
      const newChange = parseFloat(((Math.random() - 0.48) * 8).toFixed(1));
      return { ...item, price: newPrice, change: newChange, lastUpdated: new Date().toISOString() };
    }));
    setLastRefresh(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(refreshPrices, 15000);
    return () => clearInterval(interval);
  }, [refreshPrices]);

  const countries = ['All', ...Array.from(new Set(MOCK_DATA.map(d => d.country)))];

  const filtered = prices
    .filter(p => filterCountry === 'All' || p.country === filterCountry)
    .filter(p => p.commodity.toLowerCase().includes(search.toLowerCase()) || p.market.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return b.change - a.change;
      return a.commodity.localeCompare(b.commodity);
    });

  const avgChange = (prices.reduce((s, p) => s + p.change, 0) / prices.length).toFixed(1);
  const rising = prices.filter(p => p.change > 0).length;
  const falling = prices.filter(p => p.change < 0).length;

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f0fdf4', minHeight: '100vh', padding: '20px' }}>
      <header style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>🌾 Mazao Market Monitor</h1>
        <p style={{ margin: '6px 0 0', opacity: 0.85 }}>Real-time agricultural commodity prices across East Africa</p>
        <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.7 }}>Last updated: {lastRefresh.toLocaleTimeString()} · Auto-refreshes every 15s</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[{ label: 'Avg Market Change', value: `${Number(avgChange) > 0 ? '+' : ''}${avgChange}%`, color: Number(avgChange) >= 0 ? '#16a34a' : '#dc2626' },
          { label: '📈 Rising Prices', value: rising, color: '#16a34a' },
          { label: '📉 Falling Prices', value: falling, color: '#dc2626' }].map((stat, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input placeholder="Search commodity or market..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1fae5', fontSize: '14px', outline: 'none' }} />
        <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1fae5', fontSize: '14px', background: '#fff' }}>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1fae5', fontSize: '14px', background: '#fff' }}>
          <option value="commodity">Sort: A-Z</option>
          <option value="price">Sort: Price</option>
          <option value="change">Sort: Change</option>
        </select>
        <button onClick={refreshPrices} style={{ padding: '10px 18px', borderRadius: '8px', background: '#16a34a', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>🔄 Refresh</button>
      </div>

      <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0fdf4', borderBottom: '2px solid #bbf7d0' }}>
              {['Commodity', 'Market', 'Country', 'Price', 'Unit', 'Change'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 600, color: '#374151' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>{item.commodity}</td>
                <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{item.market}</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{item.country}</span></td>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#1f2937' }}>{item.price.toLocaleString()} {item.currency}</td>
                <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: '13px' }}>{item.unit}</td>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: item.change >= 0 ? '#16a34a' : '#dc2626' }}>{item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No results found.</div>}
      </div>
      <footer style={{ textAlign: 'center', marginTop: '24px', color: '#9ca3af', fontSize: '13px' }}>© 2026 Mazao Market Monitor · Empowering East African Farmers</footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
export default App;