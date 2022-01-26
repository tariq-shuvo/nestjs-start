import { TaskStatus } from './../models/tasks.model';

export class FilterTaskDto {
    status?: TaskStatus;
    search?: string;
}