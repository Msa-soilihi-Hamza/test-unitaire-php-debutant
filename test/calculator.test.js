const Calculator = require('../src/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('addition', () => {
    test('devrait additionner deux nombres positifs', () => {
      expect(calculator.calculate('2+3')).toBe(5);
    });

    test('devrait gérer les nombres négatifs', () => {
      expect(calculator.calculate('-2+3')).toBe(1);
      expect(calculator.calculate('2+-3')).toBe(-1);
    });
  });

  describe('soustraction', () => {
    test('devrait soustraire deux nombres', () => {
      expect(calculator.calculate('5-3')).toBe(2);
    });

    test('devrait gérer les nombres négatifs', () => {
      expect(calculator.calculate('-5-3')).toBe(-8);
      expect(calculator.calculate('5--3')).toBe(8);
    });
  });

  describe('multiplication', () => {
    test('devrait multiplier deux nombres', () => {
      expect(calculator.calculate('2*3')).toBe(6);
    });

    test('devrait gérer les nombres négatifs', () => {
      expect(calculator.calculate('-2*3')).toBe(-6);
      expect(calculator.calculate('-2*-3')).toBe(6);
    });
  });

  describe('division', () => {
    test('devrait diviser deux nombres', () => {
      expect(calculator.calculate('6/3')).toBe(2);
    });

    test('devrait gérer les nombres négatifs', () => {
      expect(calculator.calculate('-6/3')).toBe(-2);
      expect(calculator.calculate('-6/-3')).toBe(2);
    });

    test('devrait lancer une erreur lors d\'une division par zéro', () => {
      expect(() => calculator.calculate('6/0')).toThrow();
    });
  });

  describe('priorités d\'opération', () => {
    test('devrait respecter les priorités de multiplication', () => {
      expect(calculator.calculate('2+3*4')).toBe(14);
      expect(calculator.calculate('3*4+2')).toBe(14);
    });

    test('devrait respecter les priorités de division', () => {
      expect(calculator.calculate('8+6/3')).toBe(10);
      expect(calculator.calculate('6/3+8')).toBe(10);
    });
  });

  describe('parenthèses', () => {
    test('devrait respecter les parenthèses', () => {
      expect(calculator.calculate('(2+3)*4')).toBe(20);
      expect(calculator.calculate('2*(3+4)')).toBe(14);
    });

    test('devrait gérer les parenthèses imbriquées', () => {
      expect(calculator.calculate('((2+3)*4)+1')).toBe(21);
      expect(calculator.calculate('2*((3+4)*2)')).toBe(28);
    });
  });

  describe('expressions invalides', () => {
    test('devrait lancer une erreur pour les expressions invalides', () => {
      expect(() => calculator.calculate('2+bad')).toThrow();
      expect(() => calculator.calculate('2++3')).toThrow();
      expect(() => calculator.calculate('2+*3')).toThrow();
    });

    test('devrait lancer une erreur pour les parenthèses non équilibrées', () => {
      expect(() => calculator.calculate('(2+3')).toThrow();
      expect(() => calculator.calculate('2+3)')).toThrow();
    });
  });
});
