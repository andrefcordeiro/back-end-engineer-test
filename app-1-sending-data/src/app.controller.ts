import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { FileService } from './file/file.service';
import { Person } from './interfaces/person.interface';
import { DataReceiverService } from './data-receiver/data-receiver.service';

@Controller()
export class AppController {
  constructor(
    private readonly fileService: FileService,
    private readonly dataReceiver: DataReceiverService,
  ) {}

  /**
   * Endpoint to make the application read and send data in batches to the another application.
   */
  @HttpCode(HttpStatus.OK)
  @Get('read')
  readBatch(): void {
    this.fileService.streamBatches((batch: Person[]) => {
      void this.dataReceiver.sendData(batch);
    });
  }
}
