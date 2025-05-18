import { Person } from '@domain/entities/person.interface';
import { State } from '@infrastructure/mongoose/state.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StateService {
  constructor(@InjectModel(State.name) private stateModel: Model<State>) {}

  /**
   * Method that process the list of people counting their number by state.
   * @param people List of people.
   * @returns Number of people grouped by state.
   */
  private countPeopleByState(people: Person[]): Map<string, number> {
    const peopleByState = new Map<string, number>();

    people.forEach(person => {
      const numberOfPeople = peopleByState.get(person.state);

      if (numberOfPeople) {
        peopleByState.set(person.state, numberOfPeople + 1);
      } else {
        peopleByState.set(person.state, 1);
      }
    });
    return peopleByState;
  }

  /**
   * Method that process the list of people and store the state data.
   * @param people List of people.
   */
  async storeStates(people: Person[]) {
    const peopleByState = this.countPeopleByState(people);

    for (const [stateName, numberOfPeople] of peopleByState.entries()) {
      const state = await this.stateModel.findOne({ name: stateName }).exec();

      if (state) {
        this.stateModel.updateOne({ name: stateName }, { $set: { numberOfPeople: numberOfPeople + state.numberOfPeople } }).exec();
      } else {
        const createdState = new this.stateModel({ name: stateName, numberOfPeople: numberOfPeople });
        createdState.save();
      }
    }
  }

  /**
   * Method that returns the list of states stored on the database.
   * @returns List of states.
   */
  findAll() {
    return this.stateModel.find().exec();
  }

  /**
   * Method that deletes states stored on the database.
   * @returns List of states.
   */
  deleteAll(): Promise<any> {
    return this.stateModel.deleteMany({});
  }
}
