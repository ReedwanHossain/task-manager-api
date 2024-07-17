import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/common/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create New Task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Task' })
  @ApiResponse({
    status: 200,
  })
  findAll() {
    return this.taskService.findAll();
  }

  @Get('/pagination')
  @ApiOperation({ summary: 'Get All Task in Paginated form' })
  @ApiResponse({
    status: 200,
  })
  async findAllPagiNation(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('filter') filter?: string,
  ) {
    return this.taskService.findAllPagination(
      Number(page),
      Number(limit),
      filter,
    );
  }

  @Get('/stats')
  @ApiOperation({ summary: 'Get Task Statistics' })
  @ApiResponse({
    status: 200,
  })
  getStates() {
    return this.taskService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single Task' })
  @ApiResponse({
    status: 200,
  })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Task' })
  @ApiResponse({
    status: 204,
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Task' })
  @ApiResponse({
    status: 200,
  })
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
