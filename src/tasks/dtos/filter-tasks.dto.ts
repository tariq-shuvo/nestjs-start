import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from './../models/tasks.model';

export class FilterTaskDto {
    @IsOptional()
    // @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status?: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search?: string;
}