import { Person } from '@domain/entities/person.interface';
import { StateService } from '@domain/services/state.service';
import { State } from '@infrastructure/mongoose/state.schema';
import { Controller, Get, Logger, Post } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

@Controller('consumer')
export class ConsumerController {
  constructor(private readonly stateService: StateService) {}

  private readonly logger = new Logger(ConsumerController.name);

  /**
   * Endpoint to receive and process the people data.
   * @param people
   */
  @Post('people')
  readBatch(@Payload() people: Person[]): void {
    this.stateService.storeStates(people);
  }

  /**
   * Ednpoint to return every state stored on the database.
   * @returns List of states.
   */
  @Get('states')
  async getStates(): Promise<State[]> {
    return await this.stateService.findAll();
  }
}
