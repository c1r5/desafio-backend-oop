import FormValidation from "@/shared/domain/models/form-validation";

export default class Email implements FormValidation {
    constructor(readonly value: string) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}