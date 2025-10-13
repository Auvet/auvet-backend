import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const AUTH_API_URL = process.env['AUTH_API_URL'] || 'http://localhost:4000';

export const authenticateToken = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Token de acesso necessário',
      });
      return;
    }

    const response = await axios.post(`${AUTH_API_URL}/api/auth/validatetoken`, {
      token,
    });

    if (response.data.success) {
      (req as any).user = response.data.data;
      next();
    } else {
      res.status(401).json({
        success: false,
        error: 'Token inválido',
      });
      return;
    }
  } catch (_error) {
    console.error('Erro na validação do token:', _error);
    res.status(401).json({
      success: false,
      error: 'Erro na validação do token',
    });
    return;
  }
};
