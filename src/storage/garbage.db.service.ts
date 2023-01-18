import { GarbageModel, GarbageModelDTO } from "../models/garbage.model";
import { PrismaClient } from "@prisma/client";
import { GarbageService } from "./garbage.service";

const prisma = new PrismaClient();

export class GarbageStorage extends GarbageService {
  public async addGarbage(newGarbage: GarbageModelDTO): Promise<GarbageModel> {
    return prisma.garbage.create({ data: newGarbage });
  }

  public removeGarbage(removedId: string): Promise<GarbageModel> {
    return prisma.garbage.delete({ where: { id: removedId } });
  }

  public getGarbageList(): Promise<GarbageModel[]> {
    return prisma.garbage.findMany();
  }

  public updateGarbage(garbage: GarbageModel): Promise<GarbageModel> {
    return prisma.garbage.update({
      where: { id: garbage.id },
      data: { ...garbage },
    });
  }
}
