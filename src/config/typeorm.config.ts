import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/tasks.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "nest_task_management",
    // entities: [__dirname + '/../**/*.entity.ts'],
    entities: [Task, User],
    synchronize: true,
}