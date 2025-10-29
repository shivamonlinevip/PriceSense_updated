const express = require('express');
const router = express.Router();
const mock = require('../data/mockPrices.json');

// Helper: simple linear regression (least squares) to forecast next N days
function linearRegressionForecast(prices, days=7){
  // prices: array of {date, price}
  // map dates to x = 0..n-1
  const n = prices.length;
  if(n === 0) return [];
  const xs = [];
  const ys = [];
  for(let i=0;i<n;i++){
    xs.push(i);
    ys.push(prices[i].price);
  }
  const xMean = xs.reduce((a,b)=>a+b,0)/n;
  const yMean = ys.reduce((a,b)=>a+b,0)/n;
  let num = 0, den = 0;
  for(let i=0;i<n;i++){
    num += (xs[i]-xMean)*(ys[i]-yMean);
    den += (xs[i]-xMean)*(xs[i]-xMean);
  }
  const slope = den === 0 ? 0 : num/den;
  const intercept = yMean - slope * xMean;
  const forecast = [];
  for(let d=1; d<=days; d++){
    const x = n-1 + d; // extrapolate
    const p = intercept + slope * x;
    const date = (function(){
      const last = new Date(prices[prices.length-1].date + 'T00:00:00Z');
      last.setDate(last.getDate() + d*3); // step 3 days for visibility
      return last.toISOString().slice(0,10);
    })();
    forecast.push({date, price: Math.round(p)});
  }
  return forecast;
}

function computeSVI(data){
  const rating = data.rating || 4.0;
  const specScore = data.specScore || 7.0;
  const prices = data.prices.map(p=>p.price);
  const avg = prices.reduce((a,b)=>a+b,0)/prices.length;
  const variance = prices.reduce((a,b)=>a + Math.pow(b-avg,2),0)/prices.length;
  const stdev = Math.sqrt(variance);
  const stability = Math.max(0, 10 - stdev/1000);
  const current = prices[prices.length-1];
  let svi = ( (rating/5*3) + (specScore/10*4) + (stability/10*3) ) / (current/avg);
  svi = Math.max(0, Math.min(10, svi));
  return Math.round(svi*10)/10;
}

// GET /api/price?query=...
router.get('/price', (req, res) => {
  const product = mock;
  const response = {
    productId: 'mock-1',
    product: product.product,
    historical: product.prices,
    currentPrices: [product.prices[product.prices.length-1]]
  }
  res.json(response);
});

// POST /api/predict { productId }
router.post('/predict', (req, res) => {
  const hist = mock.prices;
  const forecast = linearRegressionForecast(hist, 7);
  const svi = computeSVI(mock);
  const pred_mean = forecast.reduce((a,b)=>a+b.price,0)/forecast.length;
  const current = hist[hist.length-1].price;
  let advice_text = '';
  let confidence = 0.6;
  if(pred_mean < current*0.98){
    advice_text = `Wait: predicted average next week ${Math.round(pred_mean)} < current ${current}.`;
    confidence = 0.75;
  } else if(pred_mean > current*1.02){
    advice_text = `Buy now: prices likely to rise (pred avg ${Math.round(pred_mean)}).`;
    confidence = 0.7;
  } else {
    advice_text = 'Safe to buy now — minor expected change.';
    confidence = 0.6;
  }
  res.json({forecast, svi, advice: {text: advice_text, confidence}});
});

module.exports = router;
