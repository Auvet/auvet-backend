import { VacinaValidator } from '../../../utils/validators';

describe('VacinaValidator - Testes Parametrizados', () => {
  describe('validateVacinaData', () => {
    it('deve validar dados da vacina válidos', () => {
      const data = {
        nome: 'V10',
        fabricante: 'Zoetis',
        dataAplicacao: '2024-01-15',
        dataValidade: '2024-12-31',
        animalId: 1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar nome vazio', () => {
      const data = {
        nome: '',
        dataAplicacao: '2024-01-15',
        animalId: 1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome da vacina é obrigatório e deve ter pelo menos 2 caracteres');
    });

    it('deve rejeitar nome muito curto', () => {
      const data = {
        nome: 'A',
        dataAplicacao: '2024-01-15',
        animalId: 1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Nome da vacina é obrigatório e deve ter pelo menos 2 caracteres');
    });

    it('deve rejeitar data de aplicação inválida', () => {
      const data = {
        nome: 'V10',
        dataAplicacao: 'data-invalida',
        animalId: 1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar data de aplicação futura', () => {
      const data = {
        nome: 'V10',
        dataAplicacao: '2030-01-01',
        animalId: 1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Data de aplicação não pode ser futura');
    });

    it('deve rejeitar ID do animal inválido - negativo', () => {
      const data = {
        nome: 'V10',
        dataAplicacao: '2024-01-15',
        animalId: -1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ID do animal é obrigatório e deve ser um número positivo');
    });

    it('deve rejeitar ID do animal inválido - zero', () => {
      const data = {
        nome: 'V10',
        dataAplicacao: '2024-01-15',
        animalId: 0,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ID do animal é obrigatório e deve ser um número positivo');
    });

    it('deve rejeitar ID do animal inválido - string', () => {
      const data = {
        nome: 'V10',
        dataAplicacao: '2024-01-15',
        animalId: 'abc',
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('ID do animal é obrigatório e deve ser um número positivo');
    });

    it('deve aceitar nome com 2 caracteres', () => {
      const data = {
        nome: 'V1',
        dataAplicacao: '2024-01-15',
        animalId: 1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar nome com 50 caracteres', () => {
      const data = {
        nome: 'V'.repeat(50),
        dataAplicacao: '2024-01-15',
        animalId: 1,
        clinicaCnpj: '11222333000181',
      };

      const result = VacinaValidator.validateVacinaData(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    const cnpjInvalidCases = [
      { cnpj: '123', description: 'CNPJ muito curto' },
      { cnpj: '1234567890123456', description: 'CNPJ muito longo' },
      { cnpj: '00000000000000', description: 'CNPJ com zeros' },
      { cnpj: '11111111111111', description: 'CNPJ com dígitos repetidos' },
    ];

    cnpjInvalidCases.forEach(({ cnpj, description }) => {
      it(`deve rejeitar CNPJ inválido - ${description}`, () => {
        const invalidData = {
          nome: 'V10',
          dataAplicacao: '2024-01-15',
          animalId: 1,
          clinicaCnpj: cnpj,
        };
        const result = VacinaValidator.validateVacinaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });
  });
});
