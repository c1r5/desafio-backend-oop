import FormValidation from "@/shared/domain/models/form-validation";

export type LoginResult = {
    user_id: string,
    session_id: string,
    email: string,
    type: string
}

export interface LoginUsecase {
    login(
        login: FormValidation,
        password: FormValidation
    ): Promise<LoginResult>
}