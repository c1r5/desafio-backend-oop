import {JwtPayload} from "@/shared/api/schemas/jwt-payload-schema";
import FieldValidationInterface from "@/shared/domain/models/field/field-validation-interface";
import {LogoutRequest} from "@/modules/session/api/schemas/logout-schema";


export type LoginResult = JwtPayload

export interface SessionUsecase {
    login(
        login: FieldValidationInterface,
        password: FieldValidationInterface
    ): Promise<LoginResult>

    logout(
        logout: LogoutRequest
    ): Promise<void>

    has_session(user_id: string): Promise<boolean>
}