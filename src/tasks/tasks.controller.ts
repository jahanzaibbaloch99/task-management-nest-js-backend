import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //     if (Object.keys(filterDto).length) {
  //         return this.tasksService.getTasksWithFilter(filterDto)
  //     }
  //     return this.tasksService.getAllTasks()
  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Tasks> {
    return this.tasksService.getTasksById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Delete("/:id")
  // deleteTaskById(@Param("id") id: string): void {
  //     return this.tasksService.deleteTaskById(id)
  // }
  // @Patch(":id/status")
  // updateTaskStatus(@Param("id") id: string, @Body('status' ,TaskStatusValidationPipe) status: TaskStatus): Task {
  //     return this.tasksService.updateTaskStatus(id, status)
  // }
}
