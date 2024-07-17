import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async getStats() {
    const cachedStats = await this.cacheManager.get('taskStats');
    if (cachedStats) {
      return cachedStats;
    }
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

    const stats = {
      totalTasks: totalTasks.length,
      todo,
      ongoing,
      done,
      backend,
      frontend,
      ui,
    };
    await this.cacheManager.set('taskStats', stats);
    return stats;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findAllPagination(
    page: number,
    limit: number,
    filter?: any,
  ): Promise<Task[]> {
    const skip = (page - 1) * limit;
    const query = filter ? { status: filter } : {};
    return this.taskModel.find(query).skip(skip).limit(limit).exec();
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

  async updateStatus(id: string, status: string): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async updateDueDate(id: string, dueDate: string): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, { dueDate }, { new: true })
      .exec();
  }
}
