import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OriginGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const origin = req.headers.origin;

    if (origin && origin !== process.env.FRONTEND_URL) {
      throw new ForbiddenException();
    }

    return true;
  }
}
