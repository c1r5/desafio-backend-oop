import "reflect-metadata";
import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import Application from "@/app";

(async () => {
    const application: Application = container.get(TYPES.ApplicationServer);
    await application
        .register_middleware(container.get(TYPES.UserValidationMiddleware))
        .register_middleware(container.get(TYPES.SessionValidationMiddleware))
        .register_middleware(container.get(TYPES.VerifyUserTransferAbilityMiddleware))
        .register_controller(container.get(TYPES.AuthController))
        .register_controller(container.get(TYPES.UserController))
        .register_controller(container.get(TYPES.TransactionController))
        .start_application()
})();