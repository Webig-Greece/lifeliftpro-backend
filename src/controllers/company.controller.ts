import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from '../dtos/company/CreateCompanyDto';
import { UpdateCompanyDto } from '../dtos/company/UpdateCompanyDto';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async create(@Body() companyData: CreateCompanyDto): Promise<Company> {
    // Replace Partial<Company> with CreateCompanyDto
    return this.companyService.create(companyData);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Company> {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedCompanyData: UpdateCompanyDto, // Replace Partial<Company> with UpdateCompanyDto
  ): Promise<Company> {
    return this.companyService.update(id, updatedCompanyData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.companyService.remove(id);
  }
}
