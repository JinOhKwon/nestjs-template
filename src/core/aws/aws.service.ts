import { Injectable } from '@nestjs/common';

@Injectable()
export class AWSService {
  // TODO ...
}
// import { Injectable, Logger } from '@nestjs/common';
// import {
//   AuthenticationDetails,
//   CognitoUser,
//   CognitoUserAttribute,
//   CognitoUserPool,
// } from 'amazon-cognito-identity-js';
// import { UserRequest } from 'modules/user/api/dto/user.request';
// import { UserError } from 'modules/user/infrastructure/constants/user-error.enum';
// import { UserDuplicateException } from 'modules/user/infrastructure/exception/user-duplicate.exception';
// import { CONFIG_KEY } from 'shared/constants/config.enum';
// import { ConfigService } from 'shared/services/config.service';

// @Injectable()
// export class AWSService {
//   /**
//    * 로거
//    */
//   private readonly logger = new Logger(AWSService.name);
//   /**
//    * 유저 풀
//    */
//   private userPool: CognitoUserPool;
//   /**
//    * 토큰
//    */
//   private token: string;

//   /**
//    * 생성자
//    *
//    * @param configService 환경서비스
//    */
//   constructor(private readonly configService: ConfigService) {
//     this.userPool = new CognitoUserPool({
//       UserPoolId: this.configService.get(CONFIG_KEY.AWS.AWS_USER_POOL_ID),
//       ClientId: this.configService.get(CONFIG_KEY.AWS.AWS_CLIENT_ID),
//     });
//   }

//   /**
//    * 로그인을 한다.
//    *
//    * @param data 데이터
//    */
//   async logIn(data: any): Promise<any> {
//     const { userId, userPwd } = data.auth;
//     const authenticationDetails = new AuthenticationDetails({
//       Username: userId,
//       Password: userPwd,
//     });
//     const userData = {
//       Username: userId,
//       Pool: this.userPool,
//     };
//     const cognitoUser = new CognitoUser(userData);
//     await cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: (result) => {
//         this.token = result.getAccessToken().getJwtToken();
//         console.log(this.token);
//       },
//       onFailure: (err: any) => {
//         console.log(`stack ::: ${err?.stack}`);
//         console.log(`name ::: ${err?.name}`);
//         console.log(`message ::: ${err?.message}`);
//       },
//     });
//   }

//   /**
//    * 로그아웃을 한다.
//    *
//    * @param data 데이터
//    * @returns
//    */
//   async logOut(data: any) {
//     const { userId } = data.auth;
//     const userData = {
//       Username: userId,
//       Pool: this.userPool,
//     };
//     const cognitoUser = new CognitoUser(userData);

//     try {
//       await cognitoUser.signOut();
//     } catch (err: any) {
//       throw err;
//     }
//   }

//   /**
//    * 회원가입을 한다.
//    *
//    * @param data 데이터
//    * @returns
//    */
//   async signUp(req: UserRequest): Promise<CognitoUser> {
//     const { userId, userPwd } = req;
//     let user;
//     await this.userPool.signUp(
//       userId,
//       userPwd,
//       [new CognitoUserAttribute({ Name: 'email', Value: userId })],
//       [],
//       (err, result) => {
//         if (result) {
//           const cognitoUser = result.user;
//           user = cognitoUser;
//         }

//         if (err) {
//           throw new UserDuplicateException(UserError.USER002, req.userId);
//         }
//       },
//     );

//     return user;
//   }
// }
