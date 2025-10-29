import React from 'react'
export default function SVIIndicator({svi}){
  return (
    <div className='card' style={{textAlign:'center'}}>
      <div className='small'>Smart Value Index</div>
      <div className='svi'>{svi ? `${svi} / 10` : '—'}</div>
      <div className='small' style={{marginTop:8}}>Higher = better buy</div>
    </div>
  )
}
