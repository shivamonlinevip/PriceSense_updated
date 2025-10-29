import React from 'https://cdn.skypack.dev/react';
export default function AdviceCard({advice}){
  if(!advice) return null;
  return React.createElement('div', {style:{padding:12,border:'1px solid #e5e7eb',borderRadius:8}},
    React.createElement('div', {style:{fontWeight:600}}, 'Recommendation'),
    React.createElement('div', {style:{marginTop:8}}, advice.text),
    React.createElement('div', {style:{fontSize:12,color:'#9ca3af', marginTop:6}}, `Confidence: ${Math.round(advice.confidence*100)}%`)
  );
}
