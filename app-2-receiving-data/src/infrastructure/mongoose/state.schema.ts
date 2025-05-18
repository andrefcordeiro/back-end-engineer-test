import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StateDocument = State & Document;

@Schema()
export class State {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  numberOfPeople: number;
}

export const StateSchema = SchemaFactory.createForClass(State);
