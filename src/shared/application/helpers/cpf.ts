function digits_mod(digits: number[]) {
    let sum = digits.slice(0, 9).reduce((acc, digit, i) => acc + digit * (10 - i), 0);
    let digit_mod = (sum * 10) % 11;
    digit_mod = digit_mod >= 10 ? 0 : digit_mod;

    return digit_mod
}

export function generate_cpf(formatted: boolean = false): string {
    const randomDigits = () => Math.floor(Math.random() * 10);
    const digits = Array.from({length: 9}, randomDigits);

    let first_check = digits_mod(digits);
    digits.push(first_check);

    let secondCheck = digits_mod(digits);
    digits.push(secondCheck);

    let cpf = digits.join('');

    if (formatted) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return cpf;
}

export function validate_cpf(document?: string): boolean {
    if (!document) {
        return false
    }
    
    const cleanedCpf = document.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) return false

    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;

    const digits = cleanedCpf.split('').map(Number);

    const first_check = digits_mod(digits.slice(0, 9));
    if (first_check !== digits[9]) return false;

    const second_check = digits_mod(digits.slice(0, 10));
    return second_check === digits[10];
}