# momentor-server

# 관련 자료

[prisma reference](https://www.prisma.io/docs/reference)
[]

# 프로젝트 실행 순서

```
$ yarn install
$ npx prisma
$ npx prisma db push
```

# prisma studio

```
// prisma용 웹 DB클라이언트 라고 생각하면 된다.
$ npx prisma stuido
```

# prisma 명령어 TODO: 모든 명령어 익숙해 질때까지 차곡차곡 쌓아가자

```
// prisma schema db에 반영
$ npx prisma db push


// 적용되지 않은 가장 최근의 마이그레이션 파일을 사용 - 없으면 새로 만듬
// migrate는 데이터베이스 내용을 초기화
$ npx prisma migrate dev

// 임시 마이그레이션 파일 만들기
$ npx prisma migrate dev --name 파일이름 --create-only

// 마이그레이션 파일 수정하기
ALTER TABLE "Profile"
RENAME COLUMN "biograpy" TO "biography"

// 임시 마이그레이션 파일 DB에 적용하기
$ npx prisma migrate dev

// DB 재설정 (초기화)
$ npx prisma migrate reset

// DB를 수동으로 수정한뒤에 수정사항 가져오기
$ npx prisma db pull

// DB를 수동으로 수정한뒤에 마이그레이션 파일에 저장하기
$ npx prisma migrate dev --name 마이그레이션


```
