import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoCollection } from '../util/mongo.util';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: MongoCollection.User })
export class User {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  @Exclude()
  password: string;

  @Prop({ type: String, required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
