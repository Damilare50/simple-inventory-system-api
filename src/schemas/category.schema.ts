import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoCollection } from '../util/mongo.util';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, collection: MongoCollection.Category })
export class Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: String, required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
