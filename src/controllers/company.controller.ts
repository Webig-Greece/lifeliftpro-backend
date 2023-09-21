import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { CompanyService } from '../services/company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() companyData: Partial<Company>): Promise<Company> {
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
    @Body() updatedCompanyData: Partial<Company>,
  ): Promise<Company> {
    return this.companyService.update(id, updatedCompanyData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.companyService.remove(id);
  }
}
