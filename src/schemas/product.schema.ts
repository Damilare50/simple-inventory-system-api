import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoCollection } from '../util/mongo.util';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { CategoryDocument } from './category.schema';
import { UserDocument } from './user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, collection: MongoCollection.Product })
export class Product {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  descriprion: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  category: CategoryDocument;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: UserDocument;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
