import { Module } from '@nestjs/common';
import { ConsumerController } from '@application/controllers/consumer.controller';
import { DomaimModule } from '@domain/domain.module';

@Module({
  controllers: [ConsumerController],
  imports: [DomaimModule],
})
export class ApplicationModule {}
