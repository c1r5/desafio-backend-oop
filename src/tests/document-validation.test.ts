describe('should validate inputs', () => {
    it('should validate cpf', () => {
        const cpf = '11144477735';

        const cpf_digits = cpf.split('').map(Number);

        let calc = (digits: number[]) => digits.reduce((acc, digit, i) => acc + (digit * ((digits.length + 1) - i)), 0);
        let calc2 = (n: number) => n < 2 ? 0 : (11 - n)

        let mod = calc(cpf_digits.slice(0, 9)) % 11
        let first_digit = calc2(mod)
        expect(first_digit).toBe(cpf_digits[9])

        let mod2 = calc(cpf_digits.slice(0, 10)) % 11
        let second_digit = calc2(mod2)
        expect(second_digit).toBe(cpf_digits[10])
    })
})