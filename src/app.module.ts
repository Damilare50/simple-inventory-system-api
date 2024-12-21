import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), ProductModule],
  controllers: [AppController],
})
export class AppModule {}
