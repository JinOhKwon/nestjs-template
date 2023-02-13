import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      userId: 'admin',
      userNm: 'admin',
      userPhone: '01023720531',
      userPwd: '0000',
      userUseYn: 'Y',
      regId: 'admin',
      regNm: 'admin',
      regDt: new Date(),
      chgId: 'admin',
      chgNm: 'admin',
      chgDt: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
