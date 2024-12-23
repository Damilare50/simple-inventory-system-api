import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  applyDecorators,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../modules/general/auth.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string =
      request.headers['authorization'] || request.headers['Authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('no auth header');
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('no token');
      throw new UnauthorizedException();
    }

    const { jwt, isValid } = await this.authService.decode(token);
    if (!isValid) {
      console.log('invalid token');
      throw new UnauthorizedException();
    }

    if (jwt && !jwt.userId) {
      console.log('no user id');
      throw new UnauthorizedException();
    }

    const _user = await this.userService.validateUser(jwt.userId);
    if (!_user) throw new UnauthorizedException();

    return true;
  }
}

export const RequiresAuth = () => {
  return applyDecorators(UseGuards(AuthGuard));
};
