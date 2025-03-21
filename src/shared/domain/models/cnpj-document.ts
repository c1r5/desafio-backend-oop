import UserDocument from "@/shared/domain/models/user-document";

export default class CnpjDocument implements UserDocument {
    constructor(readonly value: string) {
    }

    is_valid(): boolean {
        throw new Error("Method not implemented.");
    }
}