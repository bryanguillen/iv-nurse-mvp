import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

// Custom decorator to mark routes as public
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context).getContext();
    const authHeader = ctx.req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing auth token');
    }

    const token = authHeader.replace('Bearer ', '');
    const jwtSecret = this.configService.get<string>('SUPABASE_JWT_SECRET');

    try {
      const payload = verify(token, jwtSecret!) as any;

      ctx.user = {
        id: payload.sub,
        email: payload.email,
      };

      return true;
    } catch (err) {
      console.error('JWT verification failed', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
