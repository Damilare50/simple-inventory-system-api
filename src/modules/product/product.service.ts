import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument, UserDocument } from '../../schemas';
import { Model } from 'mongoose';
import { CategoryService } from '../category/category.service';
import {
  CreateProductDto,
  ListProductsFilterDto,
  UpdateProductDto,
} from './dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async create(data: CreateProductDto, auth: string): Promise<any> {
    const user = await this.getUser(auth);
    const category = await this.getCategory(user, data.categoryId);

    const _product = await this.model.findOne({
      user,
      category,
      name: data.name,
    });
    if (_product) {
      throw new ConflictException('product already exists');
    }

    const product = await this.model.create({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      user,
      category,
    });

    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.category.__v,
      categoryName: product.category.name,
    };
  }

  async list(auth: string, filter: ListProductsFilterDto): Promise<any[]> {
    const user = await this.getUser(auth);

    const query = { user };
    if (filter.name) {
      query['name'] = filter.name;
    }
    if (filter.categoryId) {
      const category = await this.getCategory(user, filter.categoryId);
      query['category'] = category;
    }

    const products = await this.model.find(query).populate('category');

    return products.map((product) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.category._id,
      categoryName: product.category.name,
    }));
  }

  async get(auth: string, id: string): Promise<any> {
    const user = await this.getUser(auth);

    const product = await this.model
      .findOne({ user, _id: id })
      .populate('category');

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.category._id,
      categoryName: product.category.name,
    };
  }

  async update(auth: string, id: string, data: UpdateProductDto): Promise<any> {
    const user = await this.getUser(auth);
    const product = await this.model
      .findOne({ user, _id: id })
      .populate('category');

    if (!product) {
      throw new NotFoundException('product not found');
    }

    if (data.name) {
      product.name = data.name;
    }

    if (data.description) {
      product.description = data.description;
    }

    if (data.price) {
      product.price = data.price;
    }

    if (data.quantity) {
      product.quantity = data.quantity;
    }

    await product.save();

    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.category._id,
      categoryName: product.category.name,
    };
  }

  async delete(auth: string, id: string): Promise<void> {
    const user = await this.getUser(auth);
    const product = await this.model.findOne({ user, _id: id });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    await product.deleteOne();
  }

  private async getUser(auth: string): Promise<UserDocument> {
    const token = auth.split(' ')[1];
    const { jwt } = await this.userService.authService.decode(token);

    return this.userService.validateUser(jwt.userId);
  }

  private async getCategory(user: UserDocument, id: string) {
    const category = await this.categoryService.fetch(user, id);

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
