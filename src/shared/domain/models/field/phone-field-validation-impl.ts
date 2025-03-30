import FieldValidationInterface from "@/shared/domain/models/field/field-validation-interface";

export default class PhoneFieldValidationImpl implements FieldValidationInterface {
    constructor(
        readonly value: string,
        readonly type: string = 'phone'
    ) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}