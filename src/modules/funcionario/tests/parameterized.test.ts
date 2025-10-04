import { FuncionarioValidator } from '../../../utils/validators';

describe('FuncionarioValidator - Testes Parametrizados', () => {
  describe('validateFuncionarioData', () => {
    it('deve validar dados do funcionário válidos', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        registroProfissional: 'CRMV-12345',
        status: 'ativo',
        nivelAcesso: 2
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar CPF vazio', () => {
      const data = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF muito curto', () => {
      const data = {
        cpf: '123',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF com dígitos verificadores incorretos', () => {
      const data = {
        cpf: '12345678900',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar nome vazio', () => {
      const data = {
        cpf: '11144477735',
        nome: '',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar email inválido', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'email-invalido',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha muito curta', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: '123',
        cargo: 'Veterinário',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar cargo vazio', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: '',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar status inválido', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'status_invalido'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar cargo válido', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'ativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar status válido', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@clinica.com',
        senha: 'senha123',
        cargo: 'Veterinário',
        status: 'inativo'
      };

      const result = FuncionarioValidator.validateFuncionarioData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});