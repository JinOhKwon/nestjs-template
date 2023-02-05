import { SetMetadata } from '@nestjs/common';
import { AuthRole } from 'common';

export const Roles = (...roles: Array<AuthRole>) => SetMetadata('roles', roles);
