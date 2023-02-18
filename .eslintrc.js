module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'webpack-hmr.config.ts'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    "@typescript-eslint/camelcase": 0,
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    // @link https://standardjs.com/rules-kokr.html 참고
    // 템플릿 문자열에는 간격이 없습니다.
    "quotes": [2, "single"],
    "template-curly-spacing": 2,
    // 주석 안에는 공백을 사용해야 합니다.
    "spaced-comment": ["error", "always", {
      "block": {
        "exceptions": ["*"],
        "balanced": true
      }
    }],
    // 세미콜론은 뒤쪽에 공백을 두고 앞쪽에는 공백을 두지 않아야 합니다.
    "semi-spacing": ["error", { "before": false, "after": true }],
    // 객체 속성 간의 일관성을 유지합니다.
    "object-property-newline": 0,
    // import, export 및 소멸된 할당의 이름을 동일한 이름으로 바꾸는 것은 허용되지 않습니다.
    "no-useless-rename": 2,
    // 생성자를 생성하면 super를 먼저 호출 하고 this 하기
    "no-this-before-super": 2,
    // 더 간단한 대안이 있을 때 삼항연산자를 사용하지 않습니다.
    "no-unneeded-ternary": 2,
    // 빈공간 배열 할당 x ['apple', , 'orange']
    "no-sparse-arrays": 2,
    // 같은 스코프안에 변수를 재정의 하면 안됨
    "no-redeclare": 2,
    // 변수를 자기 자신과 비교하지 말아야 합니다
    "no-self-compare": 2,
    // 불필요하게 중첩된 블록이 없어야 합니다.
    "no-lone-blocks": 2,
    // 들여 쓰기를 제외하고는 여러 공백을 사용하지 말아야 합니다.
    "no-multi-spaces": 2,
    // 범위 변수를 사용하면 안됨 (호이스팅)
    "no-label-var": 2,
    // err 재할당 방지
    "no-ex-assign": 2,
    // 글로벌 재할당 금지
    "no-global-assign": 2,
    // 불규칙한 공백은 사용 안됨
    "no-irregular-whitespace": 2,
    // 자식 클래스는가 부모를 할당 받으면 super() 강제, 부모는 x
    "constructor-super": 2,
    // setter 정의되면 getter는 필수
    "accessor-pairs": 2,
    // 인수가 없는 생성자는 괄호로 호출해야합니다. new Temp x, new Temp() o
    "new-parens": 2,
    // 함수 호출시 공백이 없어야함
    "func-call-spacing": [2, "never"],
    // TODO: import 멀티라인 문제때문에 추가했는데 정확히 무슨 옵션인지 작성 할 것
    // "whitespace": [true, "check-module"],
    // 콤마 사용시 현재 행 끝에 있어야함
    "comma-style": [
      2, "last", {
        "exceptions": {
          "ArrayExpression": true,
          "ArrowFunctionExpression": true,
          "ArrayPattern": true,
          "ImportDeclaration": true,
          "ObjectExpression": true,
          "ObjectPattern": true,
          "NewExpression": true,
        }
      }
    ],
    // 한줄에 쓸때 괄호에 공백 두기
    "block-spacing": 2,
    // 여러줄에 공백을 허용 하지 않음
    "no-multiple-empty-lines": [2, { "max": 1, "maxEOF": 0 }],
    // 예약어 뒤에는 공백을 추가합니다.
    "keyword-spacing": 2,
    // 공백에 연산자를 넣으세요
    "space-infix-ops": 2,
    // 콤마 뒤에 공백
    "comma-spacing": 2,
    // 함수나 변수 이름은 카멜케이스로 강제함
    "camelcase": 2,
    // if문 쓸때 중괄호 생략 불가능
    "curly": [2, "multi-line"],
    // === 으로 강제
    "eqeqeq": 2,
    // Yoda 조건을 피하십시오 if (42 === age) { } 불가능, if (age === 42) { } 가능
    "yoda": [
      "error",
      "never",
      {
        "exceptRange": true,
      },
    ],
  },
};
