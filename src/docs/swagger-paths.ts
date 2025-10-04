/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Operações relacionadas aos usuários
 *   - name: Funcionários
 *     description: Operações relacionadas aos funcionários
 *   - name: Tutores
 *     description: Operações relacionadas aos tutores
 *   - name: Animais
 *     description: Operações relacionadas aos animais
 *   - name: Clínicas
 *     description: Operações relacionadas às clínicas
 *   - name: Consultas
 *     description: Operações relacionadas às consultas
 *   - name: Vacinas
 *     description: Operações relacionadas às vacinas
 */

/**
 * @swagger
 * /api/funcionarios:
 *   post:
 *     summary: Criar um novo funcionário
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *   get:
 *     summary: Listar todos os funcionários
 *     tags: [Funcionários]
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/funcionarios/{cpf}:
 *   get:
 *     summary: Buscar funcionário por CPF
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678901"
 *     responses:
 *       200:
 *         description: Funcionário encontrado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualizar funcionário
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678901"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cargo:
 *                 type: string
 *                 example: "Veterinário Sênior"
 *               status:
 *                 type: string
 *                 enum: [ativo, inativo]
 *                 example: "ativo"
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Deletar funcionário
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678901"
 *     responses:
 *       200:
 *         description: Funcionário deletado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/tutores:
 *   post:
 *     summary: Criar um novo tutor
 *     tags: [Tutores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tutor'
 *     responses:
 *       201:
 *         description: Tutor criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *   get:
 *     summary: Listar todos os tutores
 *     tags: [Tutores]
 *     responses:
 *       200:
 *         description: Lista de tutores retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/tutores/{cpf}:
 *   get:
 *     summary: Buscar tutor por CPF
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678901"
 *     responses:
 *       200:
 *         description: Tutor encontrado com sucesso
 *       404:
 *         description: Tutor não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualizar tutor
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678901"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telefone:
 *                 type: string
 *                 example: "11999999999"
 *               endereco:
 *                 type: string
 *                 example: "Rua das Flores, 123"
 *     responses:
 *       200:
 *         description: Tutor atualizado com sucesso
 *       404:
 *         description: Tutor não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Deletar tutor
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678901"
 *     responses:
 *       200:
 *         description: Tutor deletado com sucesso
 *       404:
 *         description: Tutor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/animais:
 *   post:
 *     summary: Criar um novo animal
 *     tags: [Animais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *   get:
 *     summary: Listar todos os animais
 *     tags: [Animais]
 *     responses:
 *       200:
 *         description: Lista de animais retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/animais/{id}:
 *   get:
 *     summary: Buscar animal por ID
 *     tags: [Animais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Animal encontrado com sucesso
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualizar animal
 *     tags: [Animais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Rex Atualizado"
 *               peso:
 *                 type: number
 *                 example: 30.0
 *     responses:
 *       200:
 *         description: Animal atualizado com sucesso
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Deletar animal
 *     tags: [Animais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Animal deletado com sucesso
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/animais/tutor/{tutorCpf}:
 *   get:
 *     summary: Buscar animais por CPF do tutor
 *     tags: [Animais]
 *     parameters:
 *       - in: path
 *         name: tutorCpf
 *         required: true
 *         schema:
 *           type: string
 *         example: "12345678901"
 *     responses:
 *       200:
 *         description: Lista de animais do tutor retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/clinicas:
 *   post:
 *     summary: Criar uma nova clínica
 *     tags: [Clínicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clinica'
 *     responses:
 *       201:
 *         description: Clínica criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *   get:
 *     summary: Listar todas as clínicas
 *     tags: [Clínicas]
 *     responses:
 *       200:
 *         description: Lista de clínicas retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/clinicas/{cnpj}:
 *   get:
 *     summary: Buscar clínica por CNPJ
 *     tags: [Clínicas]
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         schema:
 *           type: string
 *         example: "11222333000181"
 *     responses:
 *       200:
 *         description: Clínica encontrada com sucesso
 *       404:
 *         description: Clínica não encontrada
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualizar clínica
 *     tags: [Clínicas]
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         schema:
 *           type: string
 *         example: "11222333000181"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Clínica PetCare Atualizada"
 *               endereco:
 *                 type: string
 *                 example: "Rua das Flores, 456"
 *     responses:
 *       200:
 *         description: Clínica atualizada com sucesso
 *       404:
 *         description: Clínica não encontrada
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Deletar clínica
 *     tags: [Clínicas]
 *     parameters:
 *       - in: path
 *         name: cnpj
 *         required: true
 *         schema:
 *           type: string
 *         example: "11222333000181"
 *     responses:
 *       200:
 *         description: Clínica deletada com sucesso
 *       404:
 *         description: Clínica não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/consultas:
 *   post:
 *     summary: Criar uma nova consulta
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consulta'
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *   get:
 *     summary: Listar todas as consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de consultas retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/consultas/{id}:
 *   get:
 *     summary: Buscar consulta por ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Consulta encontrada com sucesso
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualizar consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [agendada, realizada, cancelada, remarcada]
 *                 example: "realizada"
 *               observacoes:
 *                 type: string
 *                 example: "Animal em bom estado geral"
 *     responses:
 *       200:
 *         description: Consulta atualizada com sucesso
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Deletar consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Consulta deletada com sucesso
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/vacinas:
 *   post:
 *     summary: Criar uma nova vacina
 *     tags: [Vacinas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vacina'
 *     responses:
 *       201:
 *         description: Vacina criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *   get:
 *     summary: Listar todas as vacinas
 *     tags: [Vacinas]
 *     responses:
 *       200:
 *         description: Lista de vacinas retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/vacinas/{id}:
 *   get:
 *     summary: Buscar vacina por ID
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Vacina encontrada com sucesso
 *       404:
 *         description: Vacina não encontrada
 *       500:
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualizar vacina
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "V10 Atualizada"
 *               fabricante:
 *                 type: string
 *                 example: "Zoetis"
 *     responses:
 *       200:
 *         description: Vacina atualizada com sucesso
 *       404:
 *         description: Vacina não encontrada
 *       500:
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Deletar vacina
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Vacina deletada com sucesso
 *       404:
 *         description: Vacina não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/vacinas/animal/{animalId}:
 *   get:
 *     summary: Buscar vacinas por ID do animal
 *     tags: [Vacinas]
 *     parameters:
 *       - in: path
 *         name: animalId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de vacinas do animal retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar status da aplicação
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: Aplicação funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 database:
 *                   type: string
 *                   example: "Connected"
 *       500:
 *         description: Erro na aplicação
 */
