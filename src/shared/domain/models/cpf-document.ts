import DocumentInterface from "@/shared/domain/models/document-interface";

export default class CpfDocument implements DocumentInterface {
    constructor(
        readonly value: string,
        readonly type: string = 'cpf',
    ) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}