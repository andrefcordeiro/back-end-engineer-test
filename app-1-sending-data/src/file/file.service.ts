import { Injectable } from "@nestjs/common";
import * as csvParser from "csv-parser";
import { createReadStream } from "fs";
import * as path from "path";
import { Person } from "src/interfaces/person.interface";

@Injectable()
export class FileService {
  /**
   * Method that creates a stream to read the file and call the "onBatch" callback method every 1 second.
   * @param onBatch Callback method to receive the batches.
   * @param batchSize Size of each batch.
   */
  async streamBatches(
    onBatch: (batch: Person[]) => void,
    batchSize = 1000,
  ): Promise<void> {
    const buffer: Person[] = [];
    let streamEnded = false;

    const filePath = path.resolve(__dirname, "../../input/phone_data.csv");

    return new Promise((resolve, reject) => {
      createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row: Record<string, string>) => {
          const person: Person = {
            id: Number(row["id"]),
            name: row["name"],
            phone: row["phone"],
            state: row["state"],
          };

          buffer.push(person);
        })
        .on("end", () => {
          streamEnded = true;
        })
        .on("error", (err) => {
          console.error(err);
          clearInterval(intervalId);
          reject(err);
        });

      const intervalId = setInterval(() => {
        if (buffer.length >= batchSize) {
          const batch = buffer.splice(0, batchSize);
          onBatch(batch);
        } else if (streamEnded && buffer.length > 0) {
          const batch = buffer.splice(0, buffer.length);
          onBatch(batch);
          clearInterval(intervalId);
          resolve();
        } else if (streamEnded && buffer.length === 0) {
          clearInterval(intervalId);
          resolve();
        }
      }, 1000);
    });
  }
}
