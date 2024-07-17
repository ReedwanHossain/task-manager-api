import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TaskService } from './task.service';
import { TaskDocument } from './schemas/task.schema';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';

const mockTaskModel = {
  find: jest.fn(),
  countDocuments: jest.fn(),
  exec: jest.fn(),
};

const mockCache = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;
  let model: Model<TaskDocument>;
  let cache: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getModelToken('Task'), useValue: mockTaskModel },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    model = module.get<Model<TaskDocument>>(getModelToken('Task'));
    cache = module.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return stats from cache if available', async () => {
    const cachedStats = {
      totalTasks: 10,
      todo: 5,
      ongoing: 3,
      done: 2,
      backend: 3,
      frontend: 4,
      ui: 3,
    };
    jest.spyOn(cache, 'get').mockResolvedValue(cachedStats);

    const stats = await service.getStats();
    expect(stats).toEqual(cachedStats);
    expect(cache.get).toHaveBeenCalledWith('taskStats');
  });
});
