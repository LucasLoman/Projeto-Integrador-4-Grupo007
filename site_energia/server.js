const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let lastData={};
const history=[];

// ML: médio (detecção de anomalias simples)
function detectAnomaly(p){
  let values=history.slice(-20).map(x=>x.power);
  if(values.length<5) return "Normal";
  let avg=values.reduce((a,b)=>a+b,0)/values.length;
  if(p>avg*1.4) return "Alerta";
  return "Normal";
}

app.post('/dados',(req,res)=>{
  let d=req.body;
  d.anomaly=detectAnomaly(d.power);
  lastData=d;
  history.push(d);
  if(history.length>500) history.shift();
  res.json({status:"ok"});
});

app.get('/dados',(req,res)=>res.json(lastData));
app.get('/historico',(req,res)=>res.json(history));

app.listen(3000,()=>console.log("Rodando na porta 3000"));
