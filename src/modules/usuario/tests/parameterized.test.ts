import { UsuarioValidator } from '../../../utils/validators';

describe('UsuarioValidator - Testes Parametrizados', () => {
  describe('validateUsuarioData', () => {
    it('deve validar dados do usuário válidos', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar CPF vazio', () => {
      const data = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF muito curto', () => {
      const data = {
        cpf: '123',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF muito longo', () => {
      const data = {
        cpf: '123456789012',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF com dígitos verificadores incorretos', () => {
      const data = {
        cpf: '12345678900',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar nome vazio', () => {
      const data = {
        cpf: '11144477735',
        nome: '',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar email vazio', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: '',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar email inválido', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'email-invalido',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha vazia', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: ''
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha muito curta', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@test.com',
        senha: '123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar nome com 2 caracteres', () => {
      const data = {
        cpf: '11144477735',
        nome: 'Jo',
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar nome com 100 caracteres', () => {
      const data = {
        cpf: '11144477735',
        nome: 'J'.repeat(100),
        email: 'joao@test.com',
        senha: 'senha123'
      };

      const result = UsuarioValidator.validateUsuarioData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});