import { GarbageModel, GarbageModelDTO } from "../models/garbage.model";
import * as uuid from "uuid";
import { GarbageService } from "./garbage.service";

export class GarbageStorageLocal extends GarbageService {
  private garbages = new Map<String, GarbageModel>();

  public async addGarbage(newGarbage: GarbageModelDTO): Promise<GarbageModel> {
    const garbage: GarbageModel = {
      ...newGarbage,
      id: uuid.v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.garbages.set(garbage.id, garbage);

    return garbage;
  }

  public async removeGarbage(removedId: string): Promise<GarbageModel> {
    const garbage = this.getOneGarbage(removedId);
    this.garbages.delete(removedId);

    return garbage;
  }

  public async getGarbageList(): Promise<GarbageModel[]> {
    return [...this.garbages.values()];
  }

  public async updateGarbage(garbage: GarbageModel): Promise<GarbageModel> {
    let updated = this.getOneGarbage(garbage.id);

    const newGarbage = {
      ...garbage,
      id: updated.id,
      createdAt: updated.createdAt,
      updatedAt: new Date(),
    };

    this.garbages.set(garbage.id, garbage);

    return newGarbage;
  }

  private getOneGarbage(id: string) {
    let garbage = this.garbages.get(id);

    if (!garbage) {
      throw Error(`can not find garbage with ${id}`);
    }
    return { ...garbage };
  }
}
