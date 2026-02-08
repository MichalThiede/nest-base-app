// common/decorators/roles.decorator.ts
import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ROLES_KEY = 'roles';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: Role[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
