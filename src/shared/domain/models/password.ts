import FieldValidation from "@/shared/domain/models/field-validation";

export default class Password implements FieldValidation {
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