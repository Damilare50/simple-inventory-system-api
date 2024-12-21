import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoCollection } from '../util/mongo.util';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: MongoCollection.User })
export class User {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
