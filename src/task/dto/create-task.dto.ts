import { IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly description: string;

  @IsString()
  readonly category: string;

  @IsDateString()
  readonly dueDate: Date;

  @IsEnum(['todo', 'ongoing', 'done'])
  readonly status: string;
}
