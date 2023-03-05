
// 공통 Entity 제외 타입
export type ExludeEntity = 'regId' | 'regDt' | 'regNm' | 'chgId' | 'chgDt' | 'chgNm';

export type ExludeOmit<Entity, ExludeEntity extends keyof Entity> = Pick<Entity, Exclude<keyof Entity, ExludeEntity>>;
