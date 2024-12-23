import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'name of the product' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'description of the product' })
  description: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: 'category of the product' })
  categoryId: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'price of the product' })
  price: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'quantity of the product' })
  quantity: number;
}

export class ListProductsFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'name of the product' })
  name?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'category of the product' })
  categoryId?: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'name of the product' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'description of the product' })
  description?: string;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ description: 'price of the product' })
  price?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ description: 'quantity of the product' })
  quantity?: number;
}
