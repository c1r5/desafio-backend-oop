import FormValidation from "@/shared/domain/models/form-validation";

export type LoginResult = {
    user_id: string,
    session_id: string,
    email: string,
    type: string
}

export interface SessionUsecase {
    login(
        login: FormValidation,
        password: FormValidation
    ): Promise<LoginResult>

    logout(
        session_id: string
    ): Promise<void>

    has_session(user_id: string): Promise<boolean>
}