import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/CreateUserDto';
import { LoginUserDto } from '../dtos/user/LoginUserDto';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenBlacklistService } from '../services/token-blacklist.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req): any {
    const token = req.headers.authorization.split(' ')[1];
    this.tokenBlacklistService.addToBlacklist(token);
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  async deleteAccount(@Request() req) {
    return this.authService.deleteAccount(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('restore/:userId')
  async restoreUser(@Param('userId') userId: string) {
    return this.authService.restoreUser(userId);
  }
}
