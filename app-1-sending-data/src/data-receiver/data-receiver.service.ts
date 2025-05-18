import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { Person } from "src/interfaces/person.interface";

@Injectable()
export class DataReceiverService {
  constructor(private readonly httpService: HttpService) {}

  sendData(people: Person[]) {
    return firstValueFrom(
      this.httpService.post(
        "http://app-2-receiving-data:3000/consumer/people",
        people,
      ),
    );
  }
}
