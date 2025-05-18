import { Module } from '@nestjs/common';
import { StateService } from './services/state.service';
import { StateInfrastructureModule } from '@infrastructure/infrastructure.module';

@Module({
  imports: [StateInfrastructureModule],
  providers: [StateService],
  exports: [StateService],
})
export class DomaimModule {}
