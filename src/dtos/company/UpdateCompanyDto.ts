import {
  IsString,
  IsOptional,
  IsInt,
  IsEmail,
  IsDate,
  MaxLength,
} from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(50)
  vatNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  billingAddress?: string;

  @IsOptional()
  @IsInt()
  subscriptionPlanId?: number;

  @IsOptional()
  @IsDate()
  subscriptionExpiry?: Date;
}
