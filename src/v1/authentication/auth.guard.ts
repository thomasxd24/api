import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../users/users.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public handleRequest(err: unknown, user: User): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const { method, params } = context.switchToHttp().getRequest();
    const user: User = <User>context.switchToHttp().getRequest().user;

    // console.log(method, params.uuid, user);
    // console.log('SELF ?', user.id === params.uuid);

    // self-operation are allowed
    if (params.uuid === user.id) return true;
    // check if the asking user can access/modify/delete the targeted user
    else {
      /**
       * HTTP methods:
       * 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
       */
      switch (method) {
        // permissions level needed: 4 | 5 | 6 | 7
        case 'GET':
        case 'HEAD':
          if ([4, 5, 6, 7].includes(user.permissions)) return true;

        // permissions level needed: 2 | 3 | 6 | 7
        case 'PATCH':
        case 'POST':
        case 'PUT':
          if ([2, 3, 6, 7].includes(user.permissions)) return true;
          break;

        // permissions level needed: 1 | 3 | 5 | 7
        case 'DELETE':
        default: // unknown methods
          if ([1, 3, 5, 7].includes(user.permissions)) return true;
          break;
      }

      return false;
    }
  }
}
