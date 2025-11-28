require("dotenv").config();
const axios = require("axios");
const Clima = require("../models/Clima");

async function importarClimaAtual(cidade = "São Paulo") {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      throw new Error("API_KEY não configurada no arquivo .env");
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    const resposta = await axios.get(url);
    const data = resposta.data;

    const temp = data.main.temp;
    const feels = data.main.feels_like;
    const humidity = data.main.humidity;
    const condicao = data.weather[0].description;      // Ex: "céu limpo"
    const condicaoBruta = data.weather[0].main;        // Ex: "Clear"
    const icone = data.weather[0].icon;                // ícone gráfico


    let situacao;

    switch (condicaoBruta) {
      case "Clear":
        situacao = "☀ Sol";
        break;

      case "Clouds":
        situacao = "⛅ Nublado";
        break;

      case "Rain":
      case "Drizzle":
        situacao = "🌧 Chuva";
        break;

      case "Thunderstorm":
        situacao = "⛈ Tempestade";
        break;

      case "Snow":
        situacao = "❄ Neve";
        break;

      case "Mist":
      case "Fog":
      case "Smoke":
        situacao = "🌫 Névoa";
        break;

      default:
        situacao = "🌡 Clima indefinido";
    }

    
    const registroClima = await Clima.create({
      temp,
      origem: "api_externa"
    });

    
    return {
      cidade: data.name,
      temp,
      sensacaoTermica: feels,
      umidade: humidity,
      condicao,
      situacao,
      icone: `https://openweathermap.org/img/wn/${icone}@2x.png`,
      salvoNoBanco: registroClima
    };

  } catch (erro) {
    console.error("Erro ao importar clima:", erro.message);
    throw erro;
  }
}

module.exports = { importarClimaAtual };
