
async function carregar(){
  let r = await fetch('/dados');
  let d = await r.json();
  document.getElementById('metrics').innerHTML = JSON.stringify(d);
}
carregar();
