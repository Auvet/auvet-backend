import { AnimalValidator } from '../../../utils/validators';

describe('AnimalValidator - Testes Parametrizados', () => {
  describe('validateAnimalData', () => {
    it('deve validar dados do animal válidos', () => {
      const data = {
        nome: 'Rex',
        especie: 'Cão',
        raca: 'Golden Retriever',
        sexo: 'M',
        idade: 3,
        peso: 25.5,
        tutorCpf: '11144477735'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar nome vazio', () => {
      const data = {
        nome: '',
        tutorCpf: '11144477735'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome do animal é obrigatório e deve ter pelo menos 2 caracteres');
    });

    it('deve rejeitar nome muito curto', () => {
      const data = {
        nome: 'A',
        tutorCpf: '11144477735'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome do animal é obrigatório e deve ter pelo menos 2 caracteres');
    });

    it('deve rejeitar nome muito longo', () => {
      const data = {
        nome: 'A'.repeat(51),
        tutorCpf: '11144477735'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF inválido - muito curto', () => {
      const data = {
        nome: 'Rex',
        tutorCpf: '123'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF inválido - muito longo', () => {
      const data = {
        nome: 'Rex',
        tutorCpf: '123456789012'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF inválido - com letras', () => {
      const data = {
        nome: 'Rex',
        tutorCpf: '1234567890a'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF inválido - dígitos verificadores incorretos', () => {
      const data = {
        nome: 'Rex',
        tutorCpf: '12345678900'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar nome com 2 caracteres', () => {
      const data = {
        nome: 'Ab',
        tutorCpf: '11144477735'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar nome com 50 caracteres', () => {
      const data = {
        nome: 'A'.repeat(50),
        tutorCpf: '11144477735'
      };

      const result = AnimalValidator.validateAnimalData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});