import {validate_cpf} from "@/helpers/cpf";
import {validate_cnpj} from "@/helpers/cnpj";

export function validate_document(document: string): boolean {
    const is_valid = validate_cpf(document) || validate_cnpj(document)

    if (!is_valid) throw new Error()

    return true
}