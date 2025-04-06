import { inject, injectable } from "inversify";
import UserRepository from "@/shared/modules/user/user-repository";
import { TYPES } from "@/shared/infra/di/di-types";
import UserUseCases from "@/shared/modules/user/user-usecases";
import { EventBusInterface } from "@/shared/application/events/event-bus-interface";
import { EVENT_TYPES } from "@/shared/application/events/event-types";
import { UserEntity } from "../../domain/entities/user-entity";
import {EmailVerificationRequestedPayload} from "@/shared/application/events/events-payload";
import {get_env} from "@/shared/application/helpers/get-env";
import {generate_verification_token} from "@/shared/application/helpers/verification-token";
import {generate_email_verify_template} from "@/shared/modules/user/application/helpers/generate-email-verify-template";
import {CannotCreateUser, UserNotFound} from "@/shared/application/errors/operation-error";

@injectable()
export default class UserUsecasesImpl implements UserUseCases {
    constructor(
        @inject(TYPES.UserRepository) private user_repository: UserRepository,
        @inject(TYPES.EventBus) private event_bus: EventBusInterface
    ) {
    }

    async request_email_verification(user_id: string): Promise<void> {
        try {
            const user = await this.user_repository.get_user_by_id(user_id);

            if (!user) {
                throw new UserNotFound();
            }

            const token = generate_verification_token(user.user_id);
            const verification_link = `${get_env("APP_URL")}/verify-email?token=${token}`;
            const email_template = generate_email_verify_template(verification_link)

            await this.event_bus.publish<EmailVerificationRequestedPayload>(EVENT_TYPES.EmailVerificationRequested, {
                to: user.email,
                subject: "Verifique seu email",
                template: email_template,
                user_id: user.user_id
            });
        } catch (error) {
            console.error("Error requesting email verification:", error);
            throw new Error("Error requesting email verification");
        }
    }

    async get_user_email(user_id: string): Promise<string> {
        const user = await this.user_repository.get_user_by_id(user_id);

        if (!user) {
            throw new Error("User not found");
        }

        return user.email;
    }



    async create_user(entity: UserEntity): Promise<void> {
        try {
            const create = await this.user_repository.create_user({
                name: entity.name,
                email: entity.email?.value,
                phone: entity.phone?.value,
                document: entity.document?.value,
                password: entity.password?.value,
                user_type: entity.user_type
            });

            if (create) {
                await this.request_email_verification(create.user_id)
            }
        } catch (error) {
            console.error("Error creating user:", error);
            throw new CannotCreateUser((error as Error).message);
        }
    }

    async update_user(user_id: string, value: Partial<UserEntity>): Promise<void> {
        const update = await this.user_repository.update_user(user_id, {
            name: value.name,
            email: value.email?.value,
            phone: value?.phone?.value,
            document: value.document?.value,
            password: value.password?.value
        });

        if (update && value.email) {
            await this.request_email_verification(user_id)
        }

        // if (update && value.phone) {
        //     await this.event_bus.publish<UserEventPayload>(EVENT_TYPES.UserUpdatedPhoneEvent, update);
        // }
        //
        // if (update && value.password) {
        //     await this.event_bus.publish<UserEventPayload>(EVENT_TYPES.UserUpdatedPasswordEvent, update);
        // }

    }

    async is_active(user_id: string): Promise<boolean> {
        const user_entity = await this.user_repository.orm.findOneBy({ user_id: user_id })
        return user_entity?.status === 'active'
    }
}