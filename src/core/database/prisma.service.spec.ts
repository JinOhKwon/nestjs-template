import { Test } from '@nestjs/testing';
import { LoggerService } from 'core';
import { PrismaLogger } from './prisma-logger.service';
import { PrismaService } from './prisma.service';

describe('prismaService 테스트', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        {
          provide: PrismaLogger,
          useValue: { query: jest.fn() },
        },
        {
          provide: LoggerService,
          useValue: { log: jest.fn() },
        },
      ],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterAll(() => {
    prismaService.$disconnect();
  });

  it('prismaService 서비스 호출 ', () => {
    expect(prismaService).toBeDefined();
  });

  describe('PrimsaService 함수 호출', () => {
    it('$connect() -> ', async () => {
      expect(await prismaService.$connect()).toBeUndefined();
    });

    it('$disconnect() -> ', async () => {
      expect(await prismaService.$disconnect()).toBeUndefined();
    });
  });
});
