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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto';
import { RequiresAuth } from '../../guards/auth.guard';
import { ResponseDto } from '../../util';

@Controller('category')
@ApiTags('category')
@RequiresAuth()
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'category created successfully' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiConflictResponse({ description: 'category already exist' })
  @ApiOperation({ summary: 'create a new category' })
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @Headers('Authorization') auth: string,
  ): Promise<ResponseDto<any>> {
    const response = await this.service.create(dto, auth);

    return {
      message: 'category created successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'category listed successfully' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiOperation({ summary: 'list all categories' })
  async listCategory(
    @Headers('Authorization') auth: string,
  ): Promise<ResponseDto<any[]>> {
    const response = await this.service.list(auth);

    return {
      message: 'category listed successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'category listed successfully' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiNotFoundResponse({ description: 'not found' })
  @ApiOperation({ summary: 'get a category by id' })
  async getCategory(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ): Promise<ResponseDto<any>> {
    const response = await this.service.get(auth, id);

    return {
      message: 'category fetched successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'category updated successfully' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiNotFoundResponse({ description: 'not found' })
  @ApiConflictResponse({ description: 'category already exist' })
  @ApiOperation({ summary: 'update a category by id' })
  async updateCategory(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
    @Body() dto: CreateCategoryDto,
  ): Promise<ResponseDto<any>> {
    const response = await this.service.update(id, dto, auth);

    return {
      message: 'category updated successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'category deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'unauthorized' })
  @ApiNotFoundResponse({ description: 'not found' })
  @ApiOperation({ summary: 'delete a category by id' })
  async deleteCategory(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ): Promise<ResponseDto<void>> {
    const response = await this.service.delete(id, auth);

    return {
      message: 'category deleted successfully',
      statusCode: HttpStatus.OK,
      data: response,
    };
  }
}
