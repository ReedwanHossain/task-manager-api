import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['backend', 'frontend', 'ui'] })
  category: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true, enum: ['todo', 'ongoing', 'done'] })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
