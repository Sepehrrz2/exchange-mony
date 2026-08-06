import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export type AuthUser = { sub: string; email: string };
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(ctx: ExecutionContext): boolean { const req = ctx.switchToHttp().getRequest<Request & { user: AuthUser }>(); const auth = req.headers.authorization; if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException('Missing bearer token'); req.user = this.jwt.verify<AuthUser>(auth.slice(7), { secret: process.env.JWT_ACCESS_SECRET }); return true; }
}
