import React from 'react'
export default function AdviceCard({advice}){
  if(!advice) return null
  return (
    <div className='card' style={{background:'#f8fafc'}}>
      <div style={{fontWeight:700}}>Recommendation</div>
      <div style={{marginTop:8}}>{advice.text}</div>
      <div className='small' style={{marginTop:8}}>Confidence: {Math.round(advice.confidence*100)}%</div>
    </div>
  )
}
