import { SetMetadata } from '@nestjs/common';
import { AppRole } from '@prisma/client';

export const Roles = (...roles: Array<AppRole>) => SetMetadata('roles', roles);
