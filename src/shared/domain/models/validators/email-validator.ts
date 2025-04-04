import {z} from "zod";
import InputValidatorInterface from "@/shared/domain/models/validators/input-validator-interface";

export default class EmailValidator implements InputValidatorInterface {
    private email_validator = z.string().email();

    constructor(
        readonly value: string | undefined,
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