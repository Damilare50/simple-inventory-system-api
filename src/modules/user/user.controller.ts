import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, LoginDto, LoginResponseDto } from './dto';
import { ResponseDto } from 'src/util';
import { UserDocument } from 'src/schemas';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'user created successfully' })
  @ApiConflictResponse({
    description: 'user with email/username already exist!',
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  async createUser(
    @Body() data: CreateUserDto,
  ): Promise<ResponseDto<UserDocument>> {
    const response = await this.service.createUser(data);

    return {
      message: 'user created successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'login successful' })
  @ApiConflictResponse({
    description: 'invalid credentials provided.',
  })
  @ApiNotFoundResponse({ description: 'user not found' })
  async login(@Body() data: LoginDto): Promise<ResponseDto<LoginResponseDto>> {
    const response = await this.service.login(data);

    return {
      message: 'login successful',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }
}
