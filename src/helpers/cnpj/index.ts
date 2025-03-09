function digits_mod_cnpj(digits: number[]) {
    let weightsFirst = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let weightsSecond = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sumFirst = digits.slice(0, 12).reduce((acc, digit, i) => acc + digit * weightsFirst[i], 0);
    let firstDigit = (sumFirst % 11) < 2 ? 0 : 11 - (sumFirst % 11);

    digits.push(firstDigit);

    let sumSecond = digits.slice(0, 13).reduce((acc, digit, i) => acc + digit * weightsSecond[i], 0);
    let secondDigit = (sumSecond % 11) < 2 ? 0 : 11 - (sumSecond % 11);

    return [firstDigit, secondDigit];
}

export function generate_cnpj(formatted: boolean = false): string {
    const randomDigits = () => Math.floor(Math.random() * 10);
    const digits = Array.from({length: 12}, randomDigits);

    let [first_check, second_check] = digits_mod_cnpj(digits);
    digits.push(first_check, second_check);

    let cnpj = digits.join('');

    if (formatted) {
        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return cnpj;
}

export function validate_cnpj(document: string): boolean {
    const cleanedCnpj = document.replace(/\D/g, '');

    if (cleanedCnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleanedCnpj)) return false;

    const digits = cleanedCnpj.split('').map(Number);

    let [first_check, second_check] = digits_mod_cnpj(digits.slice(0, 12));

    return first_check === digits[12] && second_check === digits[13];
}
