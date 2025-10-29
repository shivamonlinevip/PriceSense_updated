import React from 'https://cdn.skypack.dev/react';
export default function PriceGraph({historical, forecast}){
  // simple text-based chart fallback for unbundled demo
  return React.createElement('div', {style:{padding:12,border:'1px solid #e5e7eb',borderRadius:8}},
    React.createElement('div', null, React.createElement('strong', null, 'Price history + forecast')),
    React.createElement('div', {style:{marginTop:8}},
      historical.concat(forecast||[]).map(p => React.createElement('div', {key:p.date}, `${p.date} → ₹${p.price}`))
    )
  );
}
