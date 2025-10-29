import React from 'react'
export default function InputBox({onSearch}){
  const [query, setQuery] = React.useState('')
  return (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <input className='input' value={query} onChange={e=>setQuery(e.target.value)} placeholder='Product name or link' />
      <button className='btn' onClick={()=>onSearch(query)}>Search</button>
    </div>
  )
}
