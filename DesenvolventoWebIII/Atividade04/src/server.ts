import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '..', 'views')));


app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});


app.get('/clima', async (req: Request, res: Response) => {
    
    const city = req.query.cidade as string;
    const apiKey = process.env.API_KEY;

   
    if (!city) {
        return res.status(400).json({ error: 'O nome da cidade é obrigatório.' });
    }

    if (!apiKey) {
        return res.status(500).json({ error: 'A chave da API não foi configurada no servidor.' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Formata os dados recebidos da API para um objeto mais limpo
        const weatherData = {
            nome: data.name, // Nome da cidade [cite: 36]
            pais: data.sys.country, // País [cite: 36]
            temperatura: data.main.temp, // Temperatura atual [cite: 37]
            sensacaoTermica: data.main.feels_like, // Sensação térmica [cite: 38]
            umidade: data.main.humidity, // Umidade [cite: 39]
            condicao: data.weather[0].description, // Condição do tempo (ex: "céu limpo") [cite: 40]
            icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` // Ícone representando a condição climática [cite: 42]
        };

        res.json(weatherData);
    } catch (error) {
      
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Cidade não encontrada.' });
        }
      
        return res.status(500).json({ error: 'Erro ao buscar dados do clima.' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});