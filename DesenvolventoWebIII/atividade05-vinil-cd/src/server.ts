import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import discosRoutes from './routes/discos';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/discosdb';
const PORT = Number(process.env.PORT) || 3000;

// conexão MongoDB
mongoose.connect(MONGODB_URI).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// API
app.use('/api/discos', discosRoutes);

// Frontend estático
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota raiz serve o index.html
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
