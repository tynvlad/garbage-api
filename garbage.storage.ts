import { IGarbageModel, IGarbageModelDTO } from "./garbage.model";
import * as uuid from "uuid";

export class GarbageStorage {
  private garbages: IGarbageModel[] = [];

  public addGarbage(newGarbage: IGarbageModelDTO): IGarbageModel {
    const garbage: IGarbageModel = {
      ...newGarbage,
      id: uuid.v4(),
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    this.garbages.push(garbage);
    return garbage;
  }

  public removeGarbage(removedId: string): void {
    this.garbages = this.garbages.filter(({ id }) => id === removedId);
  }

  public getGarbageList() {
    return this.garbages;
  }

  public updateGarbage(garbage: IGarbageModel): IGarbageModel {
    let updated = this.garbages.find(({ id }) => id === garbage.id);

    if (!updated) {
      throw Error(`can not find garbage with ${garbage.id}`);
    }

    updated = {
      ...garbage,
      id: updated.id,
      createdDate: updated.createdDate,
      updatedDate: new Date(),
    };

    return updated;
  }
}
