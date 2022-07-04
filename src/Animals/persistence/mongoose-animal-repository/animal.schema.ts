import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface AnimalProps {
  name: string;
  type: string;
  id?: string;
}

@Schema()
export class AnimalSchemaProps {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  id?: string;
}

export type AnimalDocument = AnimalProps & Document;
export const AnimalSchema = SchemaFactory.createForClass(AnimalSchemaProps);
