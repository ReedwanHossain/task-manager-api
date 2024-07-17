import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({ example: 'Implement Order Creation API' })
  readonly description: string;

  @IsEnum(['backend', 'fronted', 'ui'])
  @ApiProperty()
  readonly category: string;

  @IsDateString({})
  @ApiProperty()
  readonly dueDate: Date;

  @IsEnum(['todo', 'ongoing', 'done'])
  @ApiProperty()
  readonly status: string;
}
