import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(data => data.id === id)
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task
    }

    getTasksWithFilter(searchFilters: GetTasksFilterDto): Task[] {
        const { status, search } = searchFilters;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task)
        }
        return tasks
    }


    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(data => data.id !== id);
    }
    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status
        return task
    }
}
