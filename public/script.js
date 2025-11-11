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
}

async function carregarGraficos(){
    try{
        const r=await fetch(API+"/historico");
        const h=await r.json();
        const labels=h.map((_,i)=>"L"+(i+1));
        const vt=h.map(v=>v.voltage);
        const ct=h.map(v=>v.current);
        const pt=h.map(v=>v.power);
        const en=h.map(v=>v.energy);
        const cs=h.map(v=>v.cost);
        criar("graficoTensao","Tensão (V)",vt,labels);
        criar("graficoCorrente","Corrente (A)",ct,labels);
        criar("graficoPotencia","Potência (W)",pt,labels);
        criar("graficoEnergia","Energia (Wh)",en,labels);
        criar("graficoCusto","Custo (R$)",cs,labels);
        if(en.length>2){
            let prev=en[en.length-1]+(en[en.length-1]-en[en.length-2]);
            document.getElementById("prev").innerText=prev.toFixed(4)+" Wh estimado";
        }
    }catch(e){console.log(e);}
}

function criar(id,label,data,labels){
    new Chart(document.getElementById(id),{
        type:"line",
        data:{ labels:labels, datasets:[{label:label,data:data,borderWidth:2,tension:0.3}] },
        options:{responsive:true,maintainAspectRatio:false}
    });
}

carregarDadosAtuais();
carregarGraficos();
setInterval(()=>{carregarDadosAtuais();carregarGraficos();},3000);
