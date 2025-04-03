import DocumentInterface from "@/shared/domain/models/validators/document-interface";
import {validate_cpf} from "@/shared/application/helpers/cpf";

export default class CpfDocument implements DocumentInterface {
    constructor(
        readonly value: string,
        readonly type: string = 'cpf',
    ) {
    }

    is_valid(): boolean {
        return validate_cpf(this.value);
    }
}