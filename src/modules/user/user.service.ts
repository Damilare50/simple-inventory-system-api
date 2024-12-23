import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas';
import { CreateUserDto, LoginDto, LoginResponseDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../general/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    public authService: AuthService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    const _user = await this.userModel.findOne({
      $or: [{ username: dto.username }, { email: dto.email }],
    });

    if (_user) {
      throw new ConflictException('user with email/username already exist!');
    }

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      username: dto.username,
      password,
      email: dto.email,
    });

    return user;
  }

  async login(data: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({
      $or: [{ email: data.userId }, { username: data.userId }],
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const validatePass = await bcrypt.compare(data.password, user.password);
    if (!validatePass) {
      throw new ConflictException('invalid credentials provided.');
    }

    const token = await this.authService.sign({ userId: user._id });

    return {
      user,
      token,
    };
  }
  async validateUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);

    return user;
  }
}
