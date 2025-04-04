import InputValidatorInterface from "@/shared/domain/models/validators/input-validator-interface";

export default class PhoneValidator implements InputValidatorInterface {
    constructor(
        readonly value: string | undefined,
        readonly type: string = 'phone'
    ) {
    }

    is_valid(): boolean {
        return true
    }
}