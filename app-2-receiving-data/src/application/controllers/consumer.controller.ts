import { City } from '@domain/entities/city.interface';
import { StateService } from '@domain/services/state.service';
import { State } from '@infrastructure/mongoose/state.schema';
import { Controller, Get, Logger, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly stateService: StateService) {}

  private readonly logger = new Logger(ConsumerController.name);

  // @MessagePattern('Csv_Process')
  // async receiveFromQueue(@Payload() payload: any): Promise<string> {
  //   if (!Array.isArray(payload)) {
  //     this.logger.error('Invalid payload: expected an array.');
  //     throw new Error('Invalid payload: expected an array.');
  //   }

  //   const batch = payload.slice(0, 1000);

  //   this.logger.log(`Processing batch of size ${batch.length}`);
  //   this.logger.debug(`Batch content: ${JSON.stringify(batch, null, 2)}`);

  //   return `Processed batch of size ${batch.length}`;
  // }

  @Post('cities')
  readBatch(@Payload() cities: City[]): void {
    this.stateService.storeStates(cities);
  }

  @Get('states')
  async getStates(): Promise<State[]> {
    return await this.stateService.findAll();
  }
}
