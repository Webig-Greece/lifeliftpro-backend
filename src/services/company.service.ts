import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { Client, createClientAsync } from 'soap';

@Injectable()
export class CompanyService {
  private soapClient: Client;

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
    this.initSoapClient();
  }

  async create(companyData: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(companyData);
    return this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updatedCompanyData: Partial<Company>,
  ): Promise<Company> {
    await this.companyRepository.update(id, updatedCompanyData);
    return this.companyRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  private async initSoapClient() {
    try {
      this.soapClient = await createClientAsync(
        'http://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl',
      );
    } catch (error) {
      console.error('Failed to create SOAP client:', error);
    }
  }

  async verifyVATNumber(
    countryCode: string,
    vatNumber: string,
  ): Promise<object> {
    try {
      if (!this.soapClient) {
        throw new HttpException(
          'SOAP client not initialized',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const result = await this.soapClient.checkVatAsync({
        countryCode,
        vatNumber,
      });
      if (!result || result.length === 0) {
        throw new HttpException(
          'SOAP client returned null',
          HttpStatus.BAD_REQUEST,
        );
      }

      return result[0];
    } catch (error) {
      console.error('SOAP client error:', error.message);
      return { valid: false };
    }
  }
}
