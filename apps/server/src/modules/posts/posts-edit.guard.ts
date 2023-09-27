import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class PostEditGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const bearerToken = req.headers['authorization'];
   
    
    if (!bearerToken) {
      console.log('no token');
      return false;
    }

    const token = bearerToken.split(' ')[1];
    if (!token) {
      return false;
    }

    const user = this.jwtService.verify(token);
    if (!user) {
      return false;
    }

    if (user.role === 'admin') return true;

    return true;
  }
}
