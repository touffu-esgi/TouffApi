import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProviderProps } from '../../domain/provider.props';

@Schema()
export class ProviderSchemaProps {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone?: string;

  @Prop()
  address: string;

  @Prop()
  base_tariff: number;

  @Prop()
  radius: number;

  @Prop()
  profile_title: string;

  @Prop()
  profile_desc: string;
}

export type ProviderDocument = ProviderProps & Document;
export const ProviderSchema = SchemaFactory.createForClass(ProviderSchemaProps);
