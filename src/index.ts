import "reflect-metadata";
import { container } from "@/shared/infra/di/di-container";
import { DI_TYPES } from "@/shared/infra/di/di-types";
import Application from "@/app";

const application: Application = container.get(DI_TYPES.Application);
application
    .register_middleware(container.get(DI_TYPES.VerifyJWTMiddleware))
    .register_middleware(container.get(DI_TYPES.VerifySessionMiddleware))
    .register_middleware(container.get(DI_TYPES.VerifyUserMiddleware))
    .register_middleware(container.get(DI_TYPES.VerifyUserTransferAbilityMiddleware))
    .register_controller(container.get(DI_TYPES.CreateUserController))
    .register_controller(container.get(DI_TYPES.LoginController))
    .register_controller(container.get(DI_TYPES.LogoutController))
    .start_application()
    .then(() => {
        console.log("[+] Application started successfully");
    }).catch((error) => {
        console.error("[-] Error starting application:", error);
    });