import { UserRelations as _UserRelations } from './user_relations';
import { UserRoleMappRelations as _UserRoleMappRelations } from './user_role_mapp_relations';
import { RoleRelations as _RoleRelations } from './role_relations';
import { User as _User } from './user';
import { UserRoleMapp as _UserRoleMapp } from './user_role_mapp';
import { Role as _Role } from './role';

export namespace PrismaModel {
  export class UserRelations extends _UserRelations {}
  export class UserRoleMappRelations extends _UserRoleMappRelations {}
  export class RoleRelations extends _RoleRelations {}
  export class User extends _User {}
  export class UserRoleMapp extends _UserRoleMapp {}
  export class Role extends _Role {}

  export const extraModels = [UserRelations, UserRoleMappRelations, RoleRelations, User, UserRoleMapp, Role];
}
