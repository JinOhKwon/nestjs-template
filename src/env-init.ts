import { Logger } from '@nestjs/common';
import { config, SSM } from 'aws-sdk';
import * as dotenv from 'dotenv';
const logger = new Logger('envInit');

dotenv.config({
  path: '.env',
});

config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// 앱 생성 전 환경변수를 로딩한다.
const ssmClient = new SSM({
  // TODO: 어떤 속성인지 테스트 해보자
  apiVersion: '5',
  region: 'ap-northeast-2',
});

export const envInit = async (): Promise<void> => {
  const result = await ssmClient
    .getParameter({
      // Name: `/momentor/${process.env['NODE_ENV']}`,
      Name: '/momentor/local',
      WithDecryption: true,
    })
    .promise();

  if (result?.Parameter && result?.Parameter?.Value) {
    logger.log('환경변수 로딩이 완료 되었습니다.');

    const paramStroreJson: any = JSON.parse(result.Parameter.Value);
    for (const key in paramStroreJson) {
      process.env[key] = paramStroreJson[key];
    }
  } else {
    logger.log('PARAM STORE에 값이 존재하지 않습니다.', result);
  }
};

