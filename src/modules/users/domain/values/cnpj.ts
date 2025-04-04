import { UserDocument } from "./user-document";
import { ValueObject } from "./value-object";

export class CNPJ implements UserDocument {
  constructor(private readonly document: string) { }

  equals(other: ValueObject): boolean {
    if (!(other instanceof CNPJ)) {
      return false;
    }
    return this.document === other.document;
  }

  mask(): string {
    return this.document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  get value(): string {
    return CNPJ.format(this.document);
  }

  static from(value: string): CNPJ {
    if (!this.is_valid(value)) {
      throw new Error('Invalid CNPJ');
    }
    return new CNPJ(value);
  }

  static generate(formatted: boolean = false): string {
    const randomDigits = () => Math.floor(Math.random() * 10);
    const digits = Array.from({ length: 8 }, randomDigits);

    digits.push(0, 0, 0, 1)

    let [first_check, second_check] = CNPJ.digits_mod_cnpj(digits);
    digits.push(first_check, second_check);

    let cnpj = digits.join('');

    if (formatted) {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return cnpj;
  }

  private static format(document?: string): string {
    if (!document) return '';

    const cleanedCnpj = document.replace(/\D/g, '');
    return cleanedCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  private static is_valid(document?: string): boolean {
    if (!document) return false;

    const cleanedCnpj = document.replace(/\D/g, '');

    if (cleanedCnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleanedCnpj)) return false;

    const digits = cleanedCnpj.split('').map(Number);

    let [first_check, second_check] = CNPJ.digits_mod_cnpj(digits.slice(0, 12));

    return first_check === digits[12] && second_check === digits[13];
  }

  private static digits_mod_cnpj(digits: number[]) {
    let weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum1 = digits.slice(0, 12).reduce((acc, digit, i) => acc + digit * weights1[i], 0);
    let mod1 = sum1 % 11;
    let digit1 = mod1 < 2 ? 0 : 11 - mod1;

    let weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum2 = [...digits.slice(0, 12), digit1].reduce((acc, digit, i) => acc + digit * weights2[i], 0);
    let mod2 = sum2 % 11;
    let digit2 = mod2 < 2 ? 0 : 11 - mod2;

    return [digit1, digit2];
  }
}