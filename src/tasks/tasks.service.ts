import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './models/tasks.model';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTask(): Task[] {
        return this.tasks;
    }

    getTaskByID(id: string): Task {
        let taskByID = this.tasks.find(task => task.id === id);
        return taskByID;
    }

    createTask(createTaskDto: CreateTasksDto): Task{
        let {title, description} = createTaskDto;

        let task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        let result = this.getTaskByID(id);

        result.status = status;

        return this.tasks;
    }

    deleteTask(id: string){
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }
}
