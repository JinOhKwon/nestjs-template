import { SetMetadata } from "@nestjs/common";
import { AuthRole } from "../base/constants/auth-role";

export const Roles = (...roles: AuthRole[]) => SetMetadata("roles", roles);
