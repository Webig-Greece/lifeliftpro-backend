import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user/CreateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.acceptTerms) {
      throw new BadRequestException('You must accept the terms to register.');
    }

    const user: Partial<User> = {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,
      vatNumber: createUserDto.vatNumber,
      profession: createUserDto.profession,
      isFreelancer: createUserDto.roleIdentity === 'freelancer', // Mapping roleIdentity to isFreelancer
      language: createUserDto.language,
      companyName: createUserDto.companyName, // Assuming you've changed the column name to camelCase in the User entity
      // ... add other fields from CreateUserDto as necessary
    };
    return this.userService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatedUser: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
