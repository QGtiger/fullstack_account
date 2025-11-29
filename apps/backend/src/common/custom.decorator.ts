import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';
import { REQUIRE_LOGIN, REQUIRE_PERMISSION } from '@/constants/decorator';

export const RequireLogin = () => SetMetadata(REQUIRE_LOGIN, true);

export const RequirePermission = (...permissions: string[]) =>
  SetMetadata(REQUIRE_PERMISSION, permissions);

export const UserInfo = createParamDecorator(
  (data: keyof JwtUserData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.user) return null;

    return data ? request.user[data] : request.user;
  },
);
