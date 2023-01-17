import { GarbageModel, GarbageModelDTO } from "../models/garbage.model";
import * as uuid from "uuid";

export class GarbageStorage {
  private garbages = new Map<String, GarbageModel>();

  public addGarbage(newGarbage: GarbageModelDTO): GarbageModel {
    const garbage: GarbageModel = {
      ...newGarbage,
      id: uuid.v4(),
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    this.garbages.set(garbage.id, garbage);

    return garbage;
  }

  public removeGarbage(removedId: string): void {
    this.garbages.delete(removedId);
  }

  public getGarbageList(): GarbageModel[] {
    return [...this.garbages.values()];
  }

  public updateGarbage(garbage: GarbageModel): GarbageModel {
    let updated = this.garbages.get(garbage.id);

    if (!updated) {
      throw Error(`can not find garbage with ${garbage.id}`);
    }

    const newGarbage = {
      ...garbage,
      id: updated.id,
      createdDate: updated.createdDate,
      updatedDate: new Date(),
    };

    this.garbages.set(garbage.id, garbage);

    return newGarbage;
  }
}
