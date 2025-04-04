import { UserDocument } from "./user-document";

export class CPF implements UserDocument {
  constructor(private readonly value: string) { }
  mask(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  get document(): string {
    return CPF.format(this.value);
  }
  
  static from(value: string): CPF {
    if (!this.is_valid(value)) {
      throw new Error('Invalid CPF');
    }
    
    return new CPF(value);
  }

  static generate(formatted: boolean = false): string {
    const randomDigits = () => Math.floor(Math.random() * 10);
    const digits = Array.from({ length: 9 }, randomDigits);

    const firstCheck = CPF.digitsMod(digits);
    digits.push(firstCheck);

    const secondCheck = CPF.digitsMod(digits);
    digits.push(secondCheck);

    let cpf = digits.join('');

    if (formatted) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return cpf;
  }

  private static format(document: string): string {
    const cleanedCpf = document.replace(/\D/g, '');
    return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private static is_valid(document: string): boolean {
    if (!document) return false;

    const cleanedCpf = document.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;

    if ([
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ].includes(cleanedCpf)) return false;

    const digits = cleanedCpf.split('').map(Number);

    const firstCheck = CPF.digitsMod(digits.slice(0, 9));
    if (firstCheck !== digits[9]) return false;

    const secondCheck = CPF.digitsMod(digits.slice(0, 10));
    return secondCheck === digits[10];
  }

  private static digitsMod(digits: number[]): number {
    const sum = digits.reduce((acc, digit, i) => acc + (digit * ((digits.length + 1) - i)), 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : (11 - mod);
  }
}