import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export interface RecipientProps {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
}

@Schema()
export class RecipientSchemaProps {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Addresses' })
  address: string;
}

export type RecipientDocument = RecipientProps & Document;
export const RecipientSchema =
  SchemaFactory.createForClass(RecipientSchemaProps);
