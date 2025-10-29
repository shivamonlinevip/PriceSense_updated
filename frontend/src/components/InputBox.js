import React from 'https://cdn.skypack.dev/react';
export default function InputBox({onSearch}){
  const [query, setQuery] = React.useState('');
  return React.createElement('div', {style:{display:'flex',gap:8,alignItems:'center'}},
    React.createElement('input', {value:query, onChange:e=>setQuery(e.target.value), placeholder:'Product name or link', style:{padding:8,flex:1}}),
    React.createElement('button', {onClick:()=>onSearch(query), style:{padding:'8px 12px', background:'#4f46e5', color:'#fff', border:'none', borderRadius:6}}, 'Search')
  );
}
