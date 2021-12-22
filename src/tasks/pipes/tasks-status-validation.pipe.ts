import { ArgumentMetadata, PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value : any , metadata :ArgumentMetadata) {
        console.log(value , 'val')
        console.log(metadata , "meta")
    }
}