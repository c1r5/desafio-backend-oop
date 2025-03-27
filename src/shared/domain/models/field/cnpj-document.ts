import DocumentInterface from "@/shared/domain/models/field/document-interface";

export default class CnpjDocument implements DocumentInterface {
    constructor(
        readonly value: string,
        readonly type: string = 'cnpj',
    ) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}