import React from 'react'
import InputBox from '../components/InputBox'
import PriceGraph from '../components/PriceGraph'
import SVIIndicator from '../components/SVIIndicator'
import AdviceCard from '../components/AdviceCard'

export default function Dashboard(){
  const [data, setData] = React.useState(null)
  async function handleSearch(query){
    try{
      const r = await fetch('/api/price?query=' + encodeURIComponent(query))
      const json = await r.json()
      const p = await fetch('/api/predict', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({productId: json.productId})})
      const pred = await p.json()
      setData({...json, ...pred})
    }catch(e){
      alert('API error: ' + e.message)
    }
  }
  return (
    <div className='container'>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <h1 style={{fontSize:20,fontWeight:700}}>PriceSense — Demo</h1>
      </div>
      <div style={{marginTop:12}}><InputBox onSearch={handleSearch} /></div>
      {data ? (
        <div className='grid'>
          <div>
            <PriceGraph historical={data.historical} forecast={data.forecast} />
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <SVIIndicator svi={data.svi} />
            <AdviceCard advice={data.advice} />
          </div>
        </div>
      ) : <div style={{marginTop:16,color:'#6b7280'}}>Search a product to see demo output.</div>}
    </div>
  )
}
