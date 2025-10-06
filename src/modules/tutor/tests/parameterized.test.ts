import { TutorValidator } from '../../../utils/validators';

describe('TutorValidator - Testes Parametrizados', () => {
  describe('validateTutorData', () => {
    it('deve validar dados do tutor válidos', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar CPF vazio', () => {
      const data = {
        cpf: '',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF muito curto', () => {
      const data = {
        cpf: '123',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF com dígitos repetidos', () => {
      const data = {
        cpf: '11111111111',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar nome vazio', () => {
      const data = {
        cpf: '11144477735',
        nome: '',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar email inválido', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'email-invalido',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha muito curta', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: '123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar telefone vazio (opcional)', () => {
      const data = {
        cpf: '11144477735',
        nome: 'João Silva',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar nome com 2 caracteres', () => {
      const data = {
        cpf: '11144477735',
        nome: 'Jo',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar nome com 100 caracteres', () => {
      const data = {
        cpf: '11144477735',
        nome: 'J'.repeat(100),
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        endereco: 'Rua das Flores, 123',
      };

      const result = TutorValidator.validateTutorData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
