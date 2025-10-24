import { Router, Request, Response } from 'express';
import Disco from '../models/Disco';

const router = Router();

// Listar todos
router.get('/', async (_req: Request, res: Response) => {
  const discos = await Disco.find().sort({ createdAt: -1 });
  res.json(discos);
});

// Obter por ID
router.get('/:id', async (req: Request, res: Response) => {
  const disco = await Disco.findById(req.params.id);
  if (!disco) return res.status(404).json({ error: 'Disco não encontrado' });
  res.json(disco);
});

// Criar
router.post('/', async (req: Request, res: Response) => {
  try {
    const { titulo, artista, ano, genero, formato, preco } = req.body;
    const novo = await Disco.create({ titulo, artista, ano, genero, formato, preco });
    res.status(201).json(novo);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro ao criar' });
  }
});

// Atualizar
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { titulo, artista, ano, genero, formato, preco } = req.body;
    const upd = await Disco.findByIdAndUpdate(
      req.params.id,
      { titulo, artista, ano, genero, formato, preco },
      { new: true, runValidators: true }
    );
    if (!upd) return res.status(404).json({ error: 'Disco não encontrado' });
    res.json(upd);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Erro ao atualizar' });
  }
});

// Excluir
router.delete('/:id', async (req: Request, res: Response) => {
  const del = await Disco.findByIdAndDelete(req.params.id);
  if (!del) return res.status(404).json({ error: 'Disco não encontrado' });
  res.json({ ok: true });
});

export default router;
