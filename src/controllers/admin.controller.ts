import { Controller, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../shared/roles.decorator';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  // ...
}
