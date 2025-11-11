
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

class Dados(BaseModel):
    voltage: float
    current: float
    power: float
    energy: float

historico = []

modelo = None

@app.on_event("startup")
def load_model():
    global modelo
    try:
        modelo = joblib.load("modelo_consumo.pkl")
    except:
        modelo = None

@app.post("/dados")
def receber_dados(d: Dados):
    registro = d.dict()
    registro["cost"] = d.energy * 0.00082
    registro["anomaly"] = "Normal"
    historico.append(registro)
    return {"status": "OK"}

@app.get("/dados")
def ultimo():
    return historico[-1] if historico else {}

@app.get("/historico")
def get_hist():
    return historico

@app.get("/prever")
def prever_consumo():
    if not historico or modelo is None:
        return {"previsao": None}
    x = [[historico[-1]["voltage"], historico[-1]["current"], historico[-1]["power"]]]
    y = float(modelo.predict(x)[0])
    return {"previsao": y}
