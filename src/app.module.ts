import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { config } from 'node-config-ts';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGO_URI),
    ProductModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
