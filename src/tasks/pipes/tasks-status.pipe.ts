import { TaskStatus } from './../models/tasks.model';
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN, 
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status.toUpperCase());
        return idx !== -1;
    }
}