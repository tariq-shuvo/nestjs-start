import { FilterTaskDto } from './dtos/filter-tasks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './models/tasks.model';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTask(): Task[] {
        return this.tasks;
    }

    getFilteredTask(filterTaskDto: FilterTaskDto): Task[]{
        const {status, search} = filterTaskDto;
        let filteredTaskList = this.tasks;

        if(status){
            filteredTaskList = filteredTaskList.filter(task => task.status === status.toUpperCase());
        }

        if(search){
            filteredTaskList = filteredTaskList.filter(task => task.title.includes(search) || task.description.includes(search));
        }

        return filteredTaskList;
    }

    getTaskByID(id: string): Task {
        let taskByID = this.tasks.find(task => task.id === id);
        
        if(!taskByID){
            throw new NotFoundException(`Task with "${id}" not found`)
        }

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

        if(!result){
            throw new NotFoundException(`Task with "${id}" not found`)
        }

        result.status = status;

        return this.tasks;
    }

    deleteTask(id: string){
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }
}
