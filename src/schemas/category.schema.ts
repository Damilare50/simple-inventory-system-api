import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoCollection } from '../util/mongo.util';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { UserDocument } from './user.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, collection: MongoCollection.Category })
export class Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: UserDocument;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
