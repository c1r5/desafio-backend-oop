import "reflect-metadata";
import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import Application from "@/app";

(async () => {
    const application: Application = container.get(TYPES.ApplicationServer);
    await application
        .register_middleware(container.get(TYPES.UserValidationMiddleware))
        .register_middleware(container.get(TYPES.SessionValidationMiddleware))
        .register_controller(container.get(TYPES.AuthController), '/api/v1')
        .register_controller(container.get(TYPES.TransactionController), '/api/v1')
        .start_application()
})();