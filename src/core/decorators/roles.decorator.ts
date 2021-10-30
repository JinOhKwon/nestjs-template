import { SetMetadata } from "@nestjs/common";
import { AuthRole } from "common/constants/AuthRole";

export const Roles = (...roles: AuthRole[]) => SetMetadata("roles", roles);
