import { Router } from 'express';
import { FuncionarioController } from '../modules/funcionario/controller';

const router = Router();

const funcionarioController = new FuncionarioController();

router.use('/funcionarios', funcionarioController.router);

export default router;
