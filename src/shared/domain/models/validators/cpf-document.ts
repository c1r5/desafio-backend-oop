import DocumentInterface from "@/shared/domain/models/validators/document-interface";
import {generate_cpf, validate_cpf} from "@/shared/application/helpers/cpf";

export default class CpfDocument implements DocumentInterface {
    private constructor(
        readonly value: string,
        readonly type: 'cpf',
    ) {
    }

    static create(value: string): CpfDocument {
        return new CpfDocument(value, 'cpf');
    }
    static create_random(): CpfDocument {
        return new CpfDocument(generate_cpf(), 'cpf');
    }

    is_valid(): boolean {
        return validate_cpf(this.value);
    }
}