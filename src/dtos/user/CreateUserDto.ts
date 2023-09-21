// Dtos/CreateUserDto.ts

import {
  IsString,
  IsEmail,
  MinLength,
  IsIn,
  IsOptional,
  Length,
  IsBoolean,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsAlphanumeric()
  @Length(9)
  vatNumber: string;

  @IsBoolean()
  acceptTerms: boolean;

  @IsString()
  @IsIn(['psychologist', 'counselor', 'coach', 'psychiatrist'])
  profession: string;

  @IsString()
  @IsIn(['freelancer', 'company'])
  roleIdentity: string;

  @IsString()
  @Length(2)
  language: string;

  @IsOptional()
  @IsString()
  companyName?: string;
}
