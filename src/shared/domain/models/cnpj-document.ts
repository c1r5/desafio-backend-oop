import UserDocument from "@/shared/domain/models/user-document";

export default class CnpjDocument implements UserDocument {
    constructor(
        readonly value: string,
        readonly type: string = 'cnpj',
    ) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}