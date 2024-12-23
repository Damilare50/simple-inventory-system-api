import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument, UserDocument } from '../../schemas';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto';
import { AuthService } from '../general/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly model: Model<CategoryDocument>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async create(
    dto: CreateCategoryDto,
    auth: string,
  ): Promise<CategoryDocument> {
    const user = await this.getUser(auth);

    const _response = await this.model.findOne({ name: dto.name, user });
    if (_response) {
      throw new ConflictException('category already exist');
    }

    const category = await this.model.create({
      user,
      name: dto.name,
    });

    return category;
  }

  async list(auth: string): Promise<CategoryDocument[]> {
    const user = await this.getUser(auth);

    const categories = await this.model.find({ user });

    return categories;
  }

  async get(auth: string, id: string): Promise<CategoryDocument> {
    const user = await this.getUser(auth);

    const category = await this.model.findOne({ user, id });
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async update(
    id: string,
    dto: CreateCategoryDto,
    auth: string,
  ): Promise<CategoryDocument> {
    const user = await this.getUser(auth);

    const _category = await this.model.findOne({ name: dto.name, user });
    if (_category) {
      throw new ConflictException('category already exist');
    }

    const category = await this.model.findOne({ user, id });
    if (!category) {
      throw new NotFoundException();
    }

    category.name = dto.name;
    return await category.save();
  }

  async delete(id: string, auth: string): Promise<void> {
    const user = await this.getUser(auth);

    const category = await this.model.findOne({ user, id });
    if (!category) {
      throw new NotFoundException();
    }

    await category.deleteOne();
  }

  private async getUser(auth: string): Promise<UserDocument> {
    const token = auth.split(' ')[1];
    const { jwt } = await this.userService.authService.decode(token);

    return this.userService.validateUser(jwt.userId);
  }
}
