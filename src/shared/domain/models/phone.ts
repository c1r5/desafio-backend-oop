import FieldValidation from "@/shared/domain/models/field-validation";

export default class Phone implements FieldValidation {
    constructor(
        readonly value: string,
        readonly type: string = 'phone'
    ) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}