import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Company } from '../entities/company.entity';
import { CreateUserDto } from '../dtos/user/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.acceptTerms) {
      throw new BadRequestException('You must accept the terms to register.');
    }

    const countryCode = createUserDto.vatNumber.slice(0, 2);
    const vatNumber = createUserDto.vatNumber.slice(2);

    const vatResult = await this.verifyVATNumber(countryCode, vatNumber); // Implement this method

    if (!vatResult || !vatResult.valid) {
      throw new BadRequestException('Invalid VAT number');
    }

    const companyName =
      vatResult.name ||
      createUserDto.companyName ||
      `${createUserDto.firstName} ${createUserDto.lastName}`;

    const company = this.companyRepository.create({
      name: companyName,
      vatNumber: createUserDto.vatNumber,
      address: vatResult.address,
      vatVerificationDate: vatResult.requestDate,
    });

    await this.companyRepository.save(company);

    const user = this.userRepository.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password, // You'd hash this password before saving
      vatNumber: createUserDto.vatNumber,
      profession: createUserDto.profession,
      companyId: company.id,
      isFreelancer: createUserDto.roleIdentity === 'freelancer',
      language: createUserDto.language,
      // Add other fields as necessary
    });

    await this.userRepository.save(user);

    // Assign default role, send email, etc.

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updatedUser: Partial<User>): Promise<User> {
    await this.findOne(id); // To ensure the user exists
    await this.userRepository.update(id, updatedUser);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // To ensure the user exists
    await this.userRepository.delete(id);
  }
}
