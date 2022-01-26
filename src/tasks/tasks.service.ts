import { TaskRepository } from './tasks.repository';
import { FilterTaskDto } from './dtos/filter-tasks.dto';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from './models/tasks.model';
import { Task } from './tasks.entity';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    async getAllTask(filterTaskDto: FilterTaskDto): Promise<Task[]>{
        const {status, search} = filterTaskDto;

        const query = this.taskRepository.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status', {status: status.toUpperCase()});
        }

        if(search){
            query.andWhere('task.title Like :search OR task.description LIKE :search', {search: `%${search}%`});
        }

        const tasks = await query.getMany();

        return tasks;
    }

    async getTaskByID(id: number): Promise<Task> {
        let taskByID = await this.taskRepository.findOne(id);
        
        if(!taskByID){
            throw new NotFoundException(`Task with "${id}" not found`)
        }

        return taskByID;
    }

    async createTask(createTaskDto: CreateTasksDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        let result = await this.taskRepository.findOne(id);

        if(!result){
            throw new NotFoundException(`Task with "${id}" not found`)
        }

        result.status = status;

        await result.save()

        return result;
    }

    async deleteTask(id: number): Promise<Task>{
        let result = await this.taskRepository.findOne(id);

        if(!result){
            throw new NotFoundException(`Task with "${id}" not found`)
        }

        await this.taskRepository.delete(id);
        
        return result;
    }
}
