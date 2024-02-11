import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Task } from '@prisma/client';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const taskFound = await this.taskService.getTasksById(Number(id));
    if (!taskFound) throw new BadRequestException('Task does not exist');
    return taskFound;
  }

  @Post()
  async createTask(@Body() body: Task) {
    return this.taskService.createTask(body);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: Task) {
    try {
      return await this.taskService.updateTask(Number(id), body);
    } catch (error) {
      throw new BadRequestException('Task does not exist');
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(Number(id));
    } catch (error) {
      throw new BadRequestException('Task does not exist');
    }
  }
}
