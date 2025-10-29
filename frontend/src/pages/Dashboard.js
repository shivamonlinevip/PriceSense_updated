import React from 'https://cdn.skypack.dev/react';
import InputBox from '../components/InputBox.js';
import PriceGraph from '../components/PriceGraph.js';
import SVIIndicator from '../components/SVIIndicator.js';
import AdviceCard from '../components/AdviceCard.js';

export default function Dashboard(){
  const [data, setData] = React.useState(null);
  async function handleSearch(query){
    try{
      const r = await fetch('/api/price?query=' + encodeURIComponent(query));
      const json = await r.json();
      const p = await fetch('/api/predict', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({productId: json.productId})});
      const pred = await p.json();
      setData({...json, ...pred});
    }catch(e){
      alert('API error: ' + e.message);
    }
  }
  return React.createElement('div', null,
    React.createElement('h1', {style:{fontSize:20,fontWeight:700}}, 'PriceSense — Demo'),
    React.createElement(InputBox, {onSearch:handleSearch}),
    data ? React.createElement('div', {style:{display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, marginTop:16}},
      React.createElement('div', null, React.createElement(PriceGraph, {historical:data.historical, forecast:data.forecast})),
      React.createElement('div', {style:{display:'flex',flexDirection:'column',gap:12}},
        React.createElement(SVIIndicator, {svi:data.svi}),
        React.createElement(AdviceCard, {advice:data.advice})
      )
    ) : React.createElement('div', {style:{marginTop:16,color:'#6b7280'}}, 'Search a product to see demo output.')
  );
}
