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
