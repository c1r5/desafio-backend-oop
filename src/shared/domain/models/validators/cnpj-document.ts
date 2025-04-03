import DocumentInterface from "@/shared/domain/models/validators/document-interface";
import {validate_cnpj} from "@/shared/application/helpers/cnpj";

export default class CnpjDocument implements DocumentInterface {
    constructor(
        readonly value: string,
        readonly type: string = 'cnpj',
    ) {
    }

    is_valid(): boolean {
        return validate_cnpj(this.value);
    }
}