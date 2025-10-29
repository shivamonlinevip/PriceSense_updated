import React from 'https://cdn.skypack.dev/react';
export default function SVIIndicator({svi}){
  return React.createElement('div', {style:{padding:12,border:'1px solid #e5e7eb',borderRadius:8,textAlign:'center'}},
    React.createElement('div', {style:{fontSize:12,color:'#6b7280'}}, 'Smart Value Index'),
    React.createElement('div', {style:{fontSize:28,fontWeight:700}}, svi ? `${svi} / 10` : '—'),
    React.createElement('div', {style:{fontSize:12,color:'#9ca3af', marginTop:6}}, 'Higher = better buy')
  );
}
