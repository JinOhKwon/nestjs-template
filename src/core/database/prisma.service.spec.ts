import { Test } from '@nestjs/testing';
import { LoggerService } from 'core';
import { PrismaLogger } from './prisma-logger.service';
import { PrismaService } from './prisma.service';

describe('prismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: PrismaLogger,
          useValue: { query: jest.fn() }
        },
        {
          provide: LoggerService,
          useValue: { log: jest.fn() }
        }
      ],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterAll(() => {
    prismaService.$disconnect();
  });

  it('서비스 호출 prismaService', () => {
    expect(prismaService).toBeDefined();
  });

  describe('PrimsaService', () => {
    it('connect -> ', async () => {
      expect(await prismaService.$connect()).toBeUndefined();
    });

    it('prismaService disconnect -> ', async () => {
      expect(await prismaService.$disconnect()).toBeUndefined();
    });
  });
});
