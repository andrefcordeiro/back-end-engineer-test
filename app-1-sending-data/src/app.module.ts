import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './file/file.service';
import { DataReceiverService } from './data-receiver/data-receiver.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, FileService, DataReceiverService],
})
export class AppModule {}
