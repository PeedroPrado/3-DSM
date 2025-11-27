import { Request, Response } from 'express';
import { pool } from '../models/db';

export const getUsuarios = async (_: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM usuarios ORDER BY id');
  res.json(result.rows);
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  res.json(result.rows[0]);
};

export const createUsuario = async (req: Request, res: Response) => {
  const { nome, email, telefone } = req.body;
  const result = await pool.query(
    'INSERT INTO usuarios (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, telefone]
  );
  res.json(result.rows[0]);
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  const result = await pool.query(
    'UPDATE usuarios SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
    [nome, email, telefone, id]
  );
  res.json(result.rows[0]);
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
  res.sendStatus(204);
};