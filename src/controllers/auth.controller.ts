import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Delete,
  Param,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginUserDto } from '../dtos/user/LoginUserDto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { TokenBlacklistService } from '../services/token-blacklist.service';
import { RegisterUserDto } from '../dtos/auth/RegisterUserDto';
import { CompanyService } from '../services/company.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerData: RegisterUserDto): Promise<any> {
    if (!registerData.acceptTerms) {
      throw new BadRequestException('You must accept the terms to register.');
    }

    try {
      // Verify VAT number
      const vatResult: VATVerificationResult =
        await this.companyService.verifyVATNumber(
          registerData.vatNumber.substring(0, 2), // Country Code
          registerData.vatNumber.substring(2), // VAT Number
        );

      if (!vatResult || !vatResult.valid) {
        throw new BadRequestException('Invalid VAT number');
      }

      // Create new Company
      const companyData = {
        name: vatResult.name || registerData.companyName,
        vatNumber: registerData.vatNumber,
        address: vatResult.address,
        vat_verification_date: new Date(vatResult.requestDate),
      };
      const company = await this.companyService.create(companyData);

      // Create new User
      const userData = {
        ...registerData,
        companyId: company.id,
      };
      const user = await this.authService.register(userData);

      // Generate JWT token (optional)
      const payload = { userId: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Successfully created user!',
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'An error occurred during registration',
      );
    }
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

interface VATVerificationResult {
  valid?: boolean;
  name?: string;
  address?: string;
  requestDate?: string;
}
