import { TaskStatusValidationPipe } from './pipes/tasks-status.pipe';
import { FilterTaskDto } from './dtos/filter-tasks.dto';
import { TasksService } from './tasks.service';
import { TaskStatus } from './models/tasks.model';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTasksDto } from './dtos/create-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTask(@Query(ValidationPipe) filterTaskDto: FilterTaskDto){
        return this.taskService.getAllTask(filterTaskDto)
    }

    @Get('/:id')
    getTaskByID(@Param('id') id:number){
        return this.taskService.getTaskByID(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTasksDto){
        return this.taskService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:number, @Body('status', TaskStatusValidationPipe) status:TaskStatus){
        return this.taskService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:number){
        return this.taskService.deleteTask(id)
    }
}
