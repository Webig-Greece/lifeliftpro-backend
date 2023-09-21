import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/user/CreateUserDto';
import { LoginUserDto } from '../dtos/user/LoginUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async logout(): Promise<any> {
    return { message: 'Logged out successfully' };
  }

  async deleteAccount(user: any): Promise<any> {
    await this.userService.remove(user.id);
    return { message: 'Account deleted successfully' };
  }

  async restoreUser(userId: string): Promise<any> {
    // Assuming you have a soft delete mechanism where users are marked as deleted but not removed from the database.
    const user = await this.userService.findOne(+userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    // Implement the logic to restore the user.
    return { message: 'User restored successfully' };
  }
}
