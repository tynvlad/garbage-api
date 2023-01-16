import { IGarbageModel, IGarbageModelDTO } from "../models/garbage.model";
import * as uuid from "uuid";

export class GarbageStorage {
  private garbages = new Map<String, IGarbageModel>();

  public addGarbage(newGarbage: IGarbageModelDTO): IGarbageModel {
    const garbage: IGarbageModel = {
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

  public getGarbageList(): IGarbageModel[] {
    return [...this.garbages.values()];
  }

  public updateGarbage(garbage: IGarbageModel): IGarbageModel {
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
