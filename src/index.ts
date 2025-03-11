import "reflect-metadata";
import {container} from "@/shared/infra/di/di-container";
import {TYPES} from "@/shared/infra/di/di-types";
import {DataSource} from "typeorm";

(async () => {
    const datasource = container.get<DataSource>(TYPES.DataSource)

    await datasource.initialize()
})();