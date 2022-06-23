import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserProps {
  recipientReference?: string;
  providerReference?: string;
  userType: string;
  email: string;
  password: string;
}

@Schema()
export class UserSchemaProps {
  @Prop()
  recipientReference?: string;

  @Prop()
  providerReference?: string;

  @Prop()
  _id: string;

  @Prop()
  userType: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = UserProps & Document;
export const UserSchema = SchemaFactory.createForClass(UserSchemaProps);
