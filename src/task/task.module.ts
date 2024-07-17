import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    CacheModule.register({
      ttl: 3600,
      max: 100,
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
