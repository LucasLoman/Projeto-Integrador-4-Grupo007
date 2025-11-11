const api='/dados';
let chartCtx=document.getElementById('chart').getContext('2d');

let chart=new Chart(chartCtx,{type:'line',data:{labels:[],datasets:[{label:'Potencia',data:[],borderColor:'#d7263d'}]}});

async function loadData(){
  let r=await fetch(api);
  let d=await r.json();
  document.getElementById('v').innerText=d.voltage.toFixed(2);
  document.getElementById('i').innerText=d.current.toFixed(2);
  document.getElementById('p').innerText=d.power.toFixed(2);
  document.getElementById('e').innerText=d.energy.toFixed(2);
  document.getElementById('c').innerText=d.cost.toFixed(2);
  document.getElementById('anom').innerText=d.anomaly;

  chart.data.labels.push('');
  chart.data.datasets[0].data.push(d.power);
  if(chart.data.labels.length>50){chart.data.labels.shift();chart.data.datasets[0].data.shift();}
  chart.update();
}
setInterval(loadData,2000);
