-- CreateTable
CREATE TABLE `clinica` (
    `cnpj` VARCHAR(14) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(200) NULL,
    `telefone` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `administrador_cpf` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`cnpj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `cpf` VARCHAR(11) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario` (
    `cpf` VARCHAR(11) NOT NULL,
    `cargo` VARCHAR(50) NOT NULL,
    `registro_profissional` VARCHAR(50) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ativo',
    `nivel_acesso` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tutor` (
    `cpf` VARCHAR(11) NOT NULL,
    `telefone` VARCHAR(20) NULL,
    `endereco` VARCHAR(200) NULL,

    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `animal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `especie` VARCHAR(50) NULL,
    `raca` VARCHAR(50) NULL,
    `sexo` CHAR(1) NULL,
    `idade` INTEGER NULL,
    `peso` DECIMAL(5, 2) NULL,
    `tutor_cpf` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consulta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATE NOT NULL,
    `hora` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(200) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'agendada',
    `observacoes` TEXT NULL,
    `animal_id` INTEGER NOT NULL,
    `funcionario_cpf` VARCHAR(11) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `fabricante` VARCHAR(50) NULL,
    `data_aplicacao` DATE NOT NULL,
    `data_validade` DATE NULL,
    `animal_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clinica` ADD CONSTRAINT `clinica_administrador_cpf_fkey` FOREIGN KEY (`administrador_cpf`) REFERENCES `funcionario`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `funcionario` ADD CONSTRAINT `funcionario_cpf_fkey` FOREIGN KEY (`cpf`) REFERENCES `usuario`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutor` ADD CONSTRAINT `tutor_cpf_fkey` FOREIGN KEY (`cpf`) REFERENCES `usuario`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal` ADD CONSTRAINT `animal_tutor_cpf_fkey` FOREIGN KEY (`tutor_cpf`) REFERENCES `tutor`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consulta` ADD CONSTRAINT `consulta_funcionario_cpf_fkey` FOREIGN KEY (`funcionario_cpf`) REFERENCES `funcionario`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vacina` ADD CONSTRAINT `vacina_animal_id_fkey` FOREIGN KEY (`animal_id`) REFERENCES `animal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

