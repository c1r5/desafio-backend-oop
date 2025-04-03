import InputValidatorInterface from "@/shared/domain/models/validators/input-validator-interface";

export default class PasswordValidator implements InputValidatorInterface {
    constructor(
        readonly value: string,
        readonly type: string = 'password',
    ) {
    }

    is_valid(): boolean {
        return !!(
            this.value.length >= 8
            && this.value.match(/[a-z]/)
            && this.value.match(/[A-Z]/)
            && this.value.match(/[0-9]/)
        )
    }
}