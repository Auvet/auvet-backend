import { Router } from 'express';
import { FuncionarioController } from '../modules/funcionario/controller';
import { UsuarioController } from '../modules/usuario/controller';
import { TutorController } from '../modules/tutor/controller';
import { VacinaController } from '../modules/vacina/controller';
import { AnimalController } from '../modules/animal/controller';
import { ClinicaController } from '../modules/clinica/controller';
import { ConsultaController } from '../modules/consulta/controller';
import { FuncionarioClinicaController } from '../modules/funcionario-clinica/controller';
import { TutorClinicaController } from '../modules/tutor-clinica/controller';
import { AnimalClinicaController } from '../modules/animal-clinica/controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

const funcionarioController = new FuncionarioController();
const usuarioController = new UsuarioController();
const tutorController = new TutorController();
const vacinaController = new VacinaController();
const animalController = new AnimalController();
const clinicaController = new ClinicaController();
const consultaController = new ConsultaController();
const funcionarioClinicaController = new FuncionarioClinicaController();
const tutorClinicaController = new TutorClinicaController();
const animalClinicaController = new AnimalClinicaController();

router.use(authenticateToken);

router.use('/funcionarios', funcionarioController.router);
router.use('/usuarios', usuarioController.router);
router.use('/tutores', tutorController.router);
router.use('/vacinas', vacinaController.router);
router.use('/animais', animalController.router);
router.use('/clinicas', clinicaController.router);
router.use('/consultas', consultaController.router);
router.use('/funcionario-clinica', funcionarioClinicaController.router);
router.use('/tutor-clinica', tutorClinicaController.router);
router.use('/animal-clinica', animalClinicaController.router);

export default router;
