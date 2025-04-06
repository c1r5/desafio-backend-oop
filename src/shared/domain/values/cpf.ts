import { UserDocument } from "./user-document";
import { ValueObject } from "./value-object";

export class CPF implements UserDocument {
  private constructor(private readonly document: string) { }

  get type(): string {
    return 'PF';
  }
  get value(): string {
    return CPF.format(this.document);
  }

  equals(other: ValueObject): boolean {
    if (!(other instanceof CPF)) {
      return false;
    }
    return this.document === other.value;
  }

  mask(): string {
    return this.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static from(document?: string): CPF {
    if (!document) {
      throw new Error('Document is required');
    }

    if (!CPF.is_valid(document)) {
      throw new Error('Invalid CPF');
    }

    return new CPF(document);
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

  static is_valid(document: string): boolean {
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