import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'username' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'user password' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'user email' })
  email: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'username/email' })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'user password' })
  password: string;
}

export class LoginResponseDto {
  user: any;

  @ApiProperty({ description: 'user token' })
  token: string;
}
