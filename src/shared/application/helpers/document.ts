import {validate_cpf} from "@/shared/application/helpers/cpf";
import {validate_cnpj} from "@/shared/application/helpers/cnpj";

export function validate_document(document: string): boolean {
    const is_valid = validate_cpf(document) || validate_cnpj(document)

    if (!is_valid) throw new Error()

    return true
}