import { SetMetadata } from '@nestjs/common';
import { AuthRole } from '../base/constants/auth-role';

export const Roles = (...roles: Array<AuthRole>) => SetMetadata('roles', roles);
