import {JwtPayload} from "@/shared/api/schemas/jwt-payload-schema";
import FieldValidation from "@/shared/domain/models/field-validation";
import {LogoutRequest} from "@/modules/session/api/schemas/logout-schema";


export type LoginResult = JwtPayload

export interface SessionUsecase {
    login(
        login: FieldValidation,
        password: FieldValidation
    ): Promise<LoginResult>

    logout(
        logout: LogoutRequest
    ): Promise<void>

    has_session(user_id: string): Promise<boolean>
}