import UserEntity from "@/modules/users/domain/entities/user-entity";
import {validate_cnpj, validate_cpf} from "@/shared/application/helpers";

export default class UserFactory {
    static create_user(
        value: Partial<UserEntity>
    ): Partial<UserEntity> | null {
        let user = UserEntity.create()

        user.type = this.get_user_type(value.document)

        return Object.assign(user, value)
    }

    private static get_user_type(document?: string): string {
        if (validate_cnpj(document)) return 'pj'
        if (validate_cpf(document)) return 'cpf'

        throw new Error('invalid_document')
    }
}