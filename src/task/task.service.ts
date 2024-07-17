import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getStats() {
    const totalTasks = await this.findAll();
    const todo = totalTasks.filter((task) => task.status === 'todo').length;
    const ongoing = totalTasks.filter(
      (task) => task.status === 'ongoing',
    ).length;
    const done = totalTasks.filter((task) => task.status === 'done').length;
    const backend = totalTasks.filter(
      (task) => task.category === 'backend',
    ).length;
    const frontend = totalTasks.filter(
      (task) => task.category === 'frontend',
    ).length;
    const ui = totalTasks.filter((task) => task.category === 'ui').length;

    return {
      totalTasks: totalTasks.length,
      todo,
      ongoing,
      done,
      backend,
      frontend,
      ui,
    };
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto).exec();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
