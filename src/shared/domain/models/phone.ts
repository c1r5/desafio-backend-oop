import FormValidation from "@/shared/domain/models/form-validation";

export default class Phone implements FormValidation {
    constructor(readonly value: string) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}