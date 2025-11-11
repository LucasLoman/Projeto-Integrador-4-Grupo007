<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const API = "https://projeto-integrador-4-grupo007.onrender.com";
async function carregarDadosAtuais() {
    try {
        const r = await fetch(API + "/dados");
        const d = await r.json();
        volt.innerText = d.voltage.toFixed(2)+" V";
        corr.innerText = d.current.toFixed(2)+" A";
        pot.innerText  = d.power.toFixed(2)+" W";
        ener.innerText = d.energy.toFixed(4)+" Wh";
        custo.innerText = "R$ "+d.cost.toFixed(4);
        anom.innerText = d.anomaly;
    } catch(e){console.log(e);}
=======
async function fetchData(){
  const r = await fetch('https://projeto-integrador-4-grupo007.onrender.com/api/dados');
  return await r.json();
>>>>>>> parent of 353a0e5 (Teste 3.0)
=======
async function fetchData(){
  const r = await fetch('https://projeto-integrador-4-grupo007.onrender.com/api/dados');
  return await r.json();
>>>>>>> parent of 353a0e5 (Teste 3.0)
}

function criarGrafico(id, label){
  return new Chart(document.getElementById(id), {
    type:'line',
    data:{labels:[], datasets:[{label, data:[]}]},
    options:{responsive:true}
  });
}

const gCorrente = criarGrafico('graficoCorrente','Corrente (A)');
const gTensao = criarGrafico('graficoTensao','Tensão (V)');
const gPotencia = criarGrafico('graficoPotencia','Potência (W)');
const gPrev = criarGrafico('graficoPrevisao','Previsão (W)');

function previsao(dados){
  if(dados.length<3) return [];
  let ultimos = dados.slice(-10);
  let media = ultimos.reduce((a,b)=>a+b,0)/ultimos.length;
  let tendencia = (ultimos[ultimos.length-1] - ultimos[0])/ultimos.length;
  return Array.from({length:5},(_,i)=>media + tendencia*i);
}

<<<<<<< HEAD
<<<<<<< HEAD
carregarDadosAtuais();
carregarGraficos();
setInterval(()=>{carregarDadosAtuais();carregarGraficos();},3000);
=======
async function atualizar() {
  let res = await fetch('/api/historico');
  let dados = await res.json();

  if (dados.length === 0) return;

  let ultimo = dados[dados.length - 1];

  document.getElementById('v').textContent = ultimo.voltage;
  document.getElementById('i').textContent = ultimo.current;
  document.getElementById('p').textContent = ultimo.power;
  document.getElementById('e').textContent = ultimo.energy;
  document.getElementById('c').textContent = ultimo.cost;
}

setInterval(atualizar, 1000);
>>>>>>> parent of d594f64 (Teste Machine)
=======
=======
>>>>>>> parent of 353a0e5 (Teste 3.0)
async function atualizar(){
  const data = await fetchData();

  gCorrente.data.labels = data.map(x=>x.horario);
  gCorrente.data.datasets[0].data = data.map(x=>x.corrente);
  gCorrente.update();

  gTensao.data.labels = data.map(x=>x.horario);
  gTensao.data.datasets[0].data = data.map(x=>x.tensao);
  gTensao.update();

  gPotencia.data.labels = data.map(x=>x.horario);
  gPotencia.data.datasets[0].data = data.map(x=>x.potencia);
  gPotencia.update();

  const prev = previsao(data.map(x=>x.potencia));
  gPrev.data.labels = ['+1','+2','+3','+4','+5'];
  gPrev.data.datasets[0].data = prev;
  gPrev.update();
}

setInterval(atualizar, 3000);
<<<<<<< HEAD
>>>>>>> parent of 353a0e5 (Teste 3.0)
=======
>>>>>>> parent of 353a0e5 (Teste 3.0)
=======
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
>>>>>>> parent of 71e33e4 (Teste 2.0)
