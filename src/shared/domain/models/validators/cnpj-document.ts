import DocumentInterface from "@/shared/domain/models/validators/document-interface";
import {generate_cnpj, validate_cnpj} from "@/shared/application/helpers/cnpj";

export default class CnpjDocument implements DocumentInterface {
    private constructor(
        readonly value: string,
        readonly type: 'cnpj',
    ) {
    }

    static create(value: string): CnpjDocument {
        return new CnpjDocument(value, 'cnpj');
    }
    
    static create_random(): CnpjDocument {
        return new CnpjDocument(generate_cnpj(), 'cnpj');
    }

    is_valid(): boolean {
        return validate_cnpj(this.value);
    }
}