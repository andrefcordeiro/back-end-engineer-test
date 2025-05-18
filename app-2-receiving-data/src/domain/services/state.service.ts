import { City } from '@domain/entities/city.interface';
import { State } from '@infrastructure/mongoose/state.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StateService {
  constructor(@InjectModel(State.name) private stateModel: Model<State>) {}

  private countPeopleByState(cities: City[]): Map<string, number> {
    const peopleByState = new Map<string, number>();

    cities.forEach(city => {
      const numberOfPeople = peopleByState.get(city.state);

      if (numberOfPeople) {
        peopleByState.set(city.state, numberOfPeople + 1);
      } else {
        peopleByState.set(city.state, 1);
      }
    });
    return peopleByState;
  }

  async storeStates(cities: City[]) {
    const peopleByState = this.countPeopleByState(cities);
    // console.log('🚀 ~ UsersService ~ create ~ peopleByState:', peopleByState);

    for (const [stateName, numberOfPeople] of peopleByState.entries()) {
      const state = await this.stateModel.findOne({ name: stateName }).exec();
      console.log('🚀 ~ StateService ~ storeStates ~ state:', state);

      if (state) {
        this.stateModel.updateOne({ name: stateName }, { $set: { numberOfPeople: numberOfPeople + state.numberOfPeople } }).exec();
      } else {
        const createdState = new this.stateModel({ name: stateName, numberOfPeople: numberOfPeople });
        createdState.save();
      }
    }
  }

  findAll() {
    return this.stateModel.find().exec();
  }
}
