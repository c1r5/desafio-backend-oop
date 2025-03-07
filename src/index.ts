import "reflect-metadata";
import App from "@/app";
import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import {DataSource} from "typeorm";

(async () => {
    const app = new App()
    const datasource = container.get<DataSource>(TYPES.DataSource)

    await datasource.initialize()

    await app.start()
})();