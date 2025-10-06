import { ClinicaValidator, ValidatorUtils } from '../../../utils/validators';

describe('ClinicaValidator - Testes Parametrizados', () => {
  describe('validateClinicaData', () => {
    const validData = {
      cnpj: '11222333000181',
      nome: 'Clínica Veterinária PetCare',
      administradorCpf: ValidatorUtils.generateRandomCPF(),
    };

    it('deve validar dados da clínica válidos', () => {
      const result = ClinicaValidator.validateClinicaData(validData);
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
        const invalidData = { ...validData, cnpj };
        const result = ClinicaValidator.validateClinicaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    const requiredFields = [
      { field: 'cnpj', description: 'CNPJ obrigatório' },
      { field: 'nome', description: 'Nome obrigatório' },
      { field: 'administradorCpf', description: 'CPF do administrador obrigatório' },
    ];

    requiredFields.forEach(({ field, description }) => {
      it(`deve validar ${description}`, () => {
        const invalidData = { ...validData };
        delete invalidData[field as keyof typeof invalidData];
        const result = ClinicaValidator.validateClinicaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    const cpfInvalidCases = [
      { cpf: '123', description: 'CPF muito curto' },
      { cpf: '123456789012345', description: 'CPF muito longo' },
      { cpf: '00000000000', description: 'CPF com zeros' },
    ];

    cpfInvalidCases.forEach(({ cpf, description }) => {
      it(`deve rejeitar CPF inválido - ${description}`, () => {
        const invalidData = { ...validData, administradorCpf: cpf };
        const result = ClinicaValidator.validateClinicaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });
  });
});
