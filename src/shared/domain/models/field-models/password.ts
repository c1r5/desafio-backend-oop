import FieldValidationInterface from "@/shared/domain/models/field-models/field-validation-interface";

export default class Password implements FieldValidationInterface {
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