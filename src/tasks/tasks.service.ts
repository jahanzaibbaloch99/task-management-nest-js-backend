import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './tasks.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //     return this.tasks;
  // }
  async getTasksById(id: number): Promise<Tasks> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with the Id ${id} not Found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;
    console.log(title , "TITLE")
    const task = new Tasks();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    console.log(task);
    return task;
  }
  // getTaskById(id: string): Task {
  //     const found = this.tasks.find(data => data.id === id)
  //     if (!found) {
  //         throw new NotFoundException(`Task with the Id ${id} not Found`)
  //     }
  //     return found
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //     const { title, description } = createTaskDto;
  //     const task: Task = {
  //         id: uuidv4(),
  //         title,
  //         description,
  //         status: TaskStatus.OPEN
  //     }
  //     this.tasks.push(task);
  //     return task
  // }

  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;
  //     let tasks = this.getAllTasks();
  //     console.log(search, "")
  //     if (status) {
  //         tasks = tasks.filter(data => data.status == status)
  //     }
  //     if (search) {
  //         tasks = tasks.filter(data => data.title.includes(search) || data.description.includes(search))
  //     }
  //     return tasks
  // }

  // deleteTaskById(id: string): void {
  //     const found = this.getTaskById(id)
  //     this.tasks = this.tasks.filter(data => data.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     task.status = status
  //     return task
  // }
}
