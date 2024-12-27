import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequiresAuth } from '../../guards/auth.guard';
import {
  CreateProductDto,
  ListProductsFilterDto,
  UpdateProductDto,
} from './dto';
import { ResponseDto } from '../../util';

@RequiresAuth()
@Controller('product')
@ApiBearerAuth('Authorization')
@ApiTags('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'create a product' })
  @ApiOkResponse({ description: 'product created successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiConflictResponse({ description: 'product already exists' })
  async create(
    @Body() dto: CreateProductDto,
    @Headers('Authorization') auth: string,
  ): Promise<ResponseDto<any>> {
    const response = await this.service.create(dto, auth);

    return {
      message: 'product created successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'list products' })
  @ApiOkResponse({ description: 'products listed successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  async list(
    @Query() query: ListProductsFilterDto,
    @Headers('Authorization') auth: string,
  ): Promise<ResponseDto<any[]>> {
    const response = await this.service.list(auth, query);

    return {
      message: 'products listed successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get a product by id' })
  @ApiOkResponse({ description: 'product fetched successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiNotFoundResponse({ description: 'product not found' })
  async get(
    @Headers('Authorization') auth: string,
    @Param('id') id: string,
  ): Promise<ResponseDto<any>> {
    const response = await this.service.get(auth, id);

    return {
      message: 'product fetched successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update a product by id' })
  @ApiOkResponse({ description: 'product updated successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiNotFoundResponse({ description: 'product not found' })
  async update(
    @Headers('Authorization') auth: string,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ResponseDto<any>> {
    const response = await this.service.update(auth, id, dto);

    return {
      message: 'product updated successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'delete a product by id' })
  @ApiOkResponse({ description: 'product deleted successfully' })
  @ApiNotFoundResponse({ description: 'product not found' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  async delete(
    @Headers('Authorization') auth: string,
    @Param('id') id: string,
  ): Promise<ResponseDto<any>> {
    const response = await this.service.delete(auth, id);

    return {
      message: 'product deleted successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }
}
