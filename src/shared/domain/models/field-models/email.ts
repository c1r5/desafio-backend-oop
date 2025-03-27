import FieldValidationInterface from "@/shared/domain/models/field-models/field-validation-interface";
import {z} from "zod";

export default class Email implements FieldValidationInterface {
    private email_validator = z.string().email();

    constructor(
        readonly value: string,
        readonly type: string = 'email'
    ) {
    }

    is_valid(): boolean {
        try {
            this.email_validator.safeParse(this.value)
            return true
        } catch (e) {
            return false
        }
    }
}