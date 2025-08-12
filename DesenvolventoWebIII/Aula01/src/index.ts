import express from 'express';
import dotenv from 'dotenv';
import { taskRoutes } from '../src/routes/taskRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API To-Do List está rodando! Acesse /task para acessar.');
});

app.use('/task', taskRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
