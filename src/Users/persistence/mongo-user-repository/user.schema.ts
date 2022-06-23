import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserProps {
  /*
  @Prop()
  recipientReference?: string;

  @Prop()
  providerReference?: string;
  */

  @Prop()
  userType: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = UserProps & Document;
export const UserSchema = SchemaFactory.createForClass(UserProps);
