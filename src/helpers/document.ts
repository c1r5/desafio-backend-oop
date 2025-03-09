import {validate_cpf} from "@/helpers/cpf";

export function validate_document(document: string): boolean {
    return validate_cpf(document);
}