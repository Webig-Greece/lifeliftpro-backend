import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Logic to check if user has the required permissions
    if (user && user.hasPermission) {
      // Replace 'user.hasPermission' with your actual permission check logic
      return true;
    }
    return false;
  }
}
