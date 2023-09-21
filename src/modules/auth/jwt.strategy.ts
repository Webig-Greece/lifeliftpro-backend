// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Define this interface based on your payload structure
import { UserService } from '../../services/user.service';
import { TokenBlacklistService } from '../../services/token-blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'YOUR_SECRET_KEY',
    });
  }

  async validate(payload: JwtPayload) {
    // Here you can add additional validation if needed
    // For example, check if the user exists in the database
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()();
    if (this.tokenBlacklistService.isBlacklisted(token)) {
      throw new UnauthorizedException('Token is blacklisted');
    }
    return payload; // This will be added to the request object as req.user
  }
}
