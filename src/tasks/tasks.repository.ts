import { CreateTasksDto } from './dtos/create-tasks.dto';
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./tasks.entity";
import { TaskStatus } from './models/tasks.model';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    
    async createTask (createTaskDto: CreateTasksDto) {
        let {title, description} = createTaskDto;

        let task = new Task()

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save()
        
        return task;
    }
    
}