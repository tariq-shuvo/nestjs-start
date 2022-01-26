import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/tasks.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "nest_task_management",
    // entities: [__dirname + '/../**/*.entity.ts'],
    entities: [Task],
    synchronize: true,
}