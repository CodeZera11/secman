import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  type CreateUserRequest,
  CreateUserRequestDtoSchema,
} from '@repo/types';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserRequestDtoSchema))
  create(@Body() createUserRequest: CreateUserRequest) {
    return this.usersService.create(createUserRequest);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
