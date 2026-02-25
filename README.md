🔌 Medidor de Energia AutoIta – PI IV

Projeto acadêmico desenvolvido para o Projeto Integrador IV, com o objetivo de criar um sistema completo de monitoramento de consumo de energia elétrica utilizando ESP32, integração com API em FastAPI, hospedagem no Render e visualização de dados em um dashboard web com gráficos dinâmicos.

📊 Funcionalidades

✅ Leitura de tensão via ADC do ESP32

✅ Leitura de corrente via sensor (ex: ACS712)

✅ Cálculo de potência (W)

✅ Cálculo de energia acumulada (Wh)

✅ Envio dos dados para API em nuvem

✅ Dashboard web com gráficos em tempo real

✅ Classificação de consumo:

🟢 Baixo consumo

🟡 Médio consumo

🔴 Alto consumo

✅ Histórico de medições

✅ Preparado para Machine Learning (previsão de consumo)

🔬 Conversão de Dados

O ESP32 utiliza um ADC de 12 bits (0–4095).
A conversão da leitura para tensão é feita por:

V_sensor = ADC × (3.3 / 4095)

Potência:

P = V × I

Energia:

E = Σ (P × Δt_horas)

🌐 Simulação no Wokwi

O projeto pode ser simulado online pelo Wokwi no link:

🔗 https://wokwi.com/projects/444655571066930177

Basta abrir o link e clicar em Start Simulation para visualizar o funcionamento do ESP32 enviando dados.
O Site que recebe os dados: https://projeto-integrador-4-grupo007.onrender.com/

📈 Dashboard

O dashboard exibe:

Gráfico de consumo em Wh

Status de consumo (baixo, médio ou alto)

Histórico de medições

Integração direta com a API

🛠 Tecnologias Utilizadas

ESP32

FastAPI

Python

Chart.js

HTML5

CSS3

JavaScript

Render (Deploy)

Wokwi (Simulação)

🎯 Objetivo Acadêmico

Demonstrar a integração entre:

Hardware (microcontrolador)

Conversão de grandezas físicas

Backend em nuvem

Visualização web

Conceitos iniciais de análise e previsão de dados
