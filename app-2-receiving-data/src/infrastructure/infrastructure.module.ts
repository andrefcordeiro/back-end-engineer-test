import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateSchema } from './mongoose/state.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/states'), MongooseModule.forFeature([{ name: 'State', schema: StateSchema }])],
  exports: [MongooseModule],
})
export class StateInfrastructureModule {}
