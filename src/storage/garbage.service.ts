import { GarbageModel, GarbageModelDTO } from "../models/garbage.model";

export abstract class GarbageService {
  public abstract addGarbage(
    newGarbage: GarbageModelDTO
  ): Promise<GarbageModel>;

  public abstract removeGarbage(removedId: string): Promise<GarbageModel>;
  public abstract getGarbageList(): Promise<GarbageModel[]>;

  public abstract updateGarbage(garbage: GarbageModel): Promise<GarbageModel>;
}
