import { Router } from 'express';
import { FuncionarioController } from '../modules/funcionario/controller';
import { UsuarioController } from '../modules/usuario/controller';
import { TutorController } from '../modules/tutor/controller';
import { VacinaController } from '../modules/vacina/controller';
import { AnimalController } from '../modules/animal/controller';
import { ClinicaController } from '../modules/clinica/controller';
import { ConsultaController } from '../modules/consulta/controller';

const router = Router();

const funcionarioController = new FuncionarioController();
const usuarioController = new UsuarioController();
const tutorController = new TutorController();
const vacinaController = new VacinaController();
const animalController = new AnimalController();
const clinicaController = new ClinicaController();
const consultaController = new ConsultaController();

router.use('/funcionarios', funcionarioController.router);
router.use('/usuarios', usuarioController.router);
router.use('/tutores', tutorController.router);
router.use('/vacinas', vacinaController.router);
router.use('/animais', animalController.router);
router.use('/clinicas', clinicaController.router);
router.use('/consultas', consultaController.router);

export default router;
