async function fetchData(){
  const r = await fetch('https://projeto-integrador-4-grupo007.onrender.com/api/dados');
  return await r.json();
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
