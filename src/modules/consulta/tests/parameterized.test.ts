import { ConsultaValidator, ValidatorUtils } from '../../../utils/validators';

describe('ConsultaValidator - Testes Parametrizados', () => {
  describe('validateConsultaData', () => {
    const validData = {
      data: new Date('2025-12-25'),
      hora: new Date('2025-12-25T14:30:00'),
      motivo: 'Consulta de rotina',
      status: 'agendada',
      animalId: 1,
      funcionarioCpf: ValidatorUtils.generateRandomCPF(),
    };

    it('deve validar dados da consulta válidos', () => {
      const result = ConsultaValidator.validateConsultaData(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    const cpfInvalidCases = [
      { cpf: '123', description: 'CPF muito curto' },
      { cpf: '123456789012345', description: 'CPF muito longo' },
      { cpf: '00000000000', description: 'CPF com zeros' },
      { cpf: '11111111111', description: 'CPF com dígitos repetidos' },
    ];

    cpfInvalidCases.forEach(({ cpf, description }) => {
      it(`deve rejeitar CPF inválido - ${description}`, () => {
        const invalidData = { ...validData, funcionarioCpf: cpf };
        const result = ConsultaValidator.validateConsultaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    const animalIdInvalidCases = [
      { animalId: -1, description: 'ID negativo' },
      { animalId: 0, description: 'ID zero' },
      { animalId: 'abc', description: 'ID não numérico' },
    ];

    animalIdInvalidCases.forEach(({ animalId, description }) => {
      it(`deve rejeitar animalId inválido - ${description}`, () => {
        const invalidData = { ...validData, animalId };
        const result = ConsultaValidator.validateConsultaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    const statusInvalidCases = [
      { status: '', description: 'Status vazio' },
      { status: 'status_invalido', description: 'Status inexistente' },
      { status: null, description: 'Status nulo' },
    ];

    statusInvalidCases.forEach(({ status, description }) => {
      it(`deve rejeitar status inválido - ${description}`, () => {
        const invalidData = { ...validData, status };
        const result = ConsultaValidator.validateConsultaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    const requiredFields = [
      { field: 'data', description: 'Data obrigatória' },
      { field: 'hora', description: 'Hora obrigatória' },
      { field: 'status', description: 'Status obrigatório' },
      { field: 'animalId', description: 'AnimalId obrigatório' },
      { field: 'funcionarioCpf', description: 'CPF do funcionário obrigatório' },
    ];

    requiredFields.forEach(({ field, description }) => {
      it(`deve validar ${description}`, () => {
        const invalidData = { ...validData };
        delete invalidData[field as keyof typeof invalidData];
        const result = ConsultaValidator.validateConsultaData(invalidData);
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    const validStatuses = ['agendada', 'realizada', 'cancelada', 'remarcada'];

    validStatuses.forEach(status => {
      it(`deve aceitar status válido: ${status}`, () => {
        const validDataWithStatus = { ...validData, status };
        const result = ConsultaValidator.validateConsultaData(validDataWithStatus);
        expect(result.isValid).toBe(true);
      });
    });
  });
});
