import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface AddressProps {
  _id?: string;
  addr1: string;
  addr2?: string;
  zipcode: string;
  city: string;
  country: string;
}

@Schema()
export class addressSchemaProps {
  @Prop()
  addr1: string;

  @Prop()
  addr2?: string;

  @Prop()
  zipcode: string;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

export type AddressDocument = AddressProps & Document;
export const AddressSchema = SchemaFactory.createForClass(addressSchemaProps);
