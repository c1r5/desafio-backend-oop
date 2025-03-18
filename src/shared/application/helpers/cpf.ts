function digits_mod(digits: number[]) {
    let sum = digits.reduce((acc, digit, i) => acc + (digit * ((digits.length + 1) - i)), 0);
    let mod = sum % 11;

    return mod < 2 ? 0 : (11 - mod)
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
    ].indexOf(cleanedCpf) !== -1) return false

    const digits = cleanedCpf.split('').map(Number);

    const first_check = digits_mod(digits.slice(0, 9));
    if (first_check !== digits[9]) return false;

    const second_check = digits_mod(digits.slice(0, 10));
    return second_check === digits[10];
}