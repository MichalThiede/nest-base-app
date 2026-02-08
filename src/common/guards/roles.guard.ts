import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IUser } from 'src/modules/users/domain/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('requiredRoles:', requiredRoles);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;

    console.log('User in RolesGuard:', user);

    return user?.role && requiredRoles.includes(user.role);
  }
}
