import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function PriceGraph({historical, forecast}){
  const labels = (historical||[]).map(p=>p.date).concat((forecast||[]).map(p=>p.date))
  const data = {
    labels,
    datasets: [
      {
        label: 'Price (₹)',
        data: (historical||[]).map(p=>p.price).concat((forecast||[]).map(p=>p.price)),
        fill:false,
        tension:0.2,
        borderWidth:2
      }
    ]
  }
  const options = { responsive:true, plugins:{legend:{position:'top'}} }
  return <div className='card'><div style={{fontWeight:700}}>Price history + forecast</div><div style={{marginTop:12}}><Line data={data} options={options} /></div></div>
}
