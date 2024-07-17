import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @ApiProperty({ example: 'reedwan' })
  readonly username: string;

  @IsEmail()
  @ApiProperty({ example: 'reedwan@test.com' })
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '123456' })
  readonly password: string;
}
