import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './models/tasks.model';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTasksDto } from './dtos/create-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTask(){
        return this.taskService.getAllTask()
    }

    @Get('/:id')
    getTaskByID(@Param('id') id:string){
        return this.taskService.getTaskByID(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTasksDto){
        return this.taskService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body('status') status:TaskStatus){
        return this.taskService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        return this.taskService.deleteTask(id)
    }
}
