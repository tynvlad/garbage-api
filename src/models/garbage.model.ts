export interface IGarbageModel {
  id: string;
  name: string;
  createdDate: Date;
  updatedDate: Date;
  link: string;
  comment: string;
  tags: string[];
}

export interface IGarbageModelDTO
  extends Omit<IGarbageModel, "id" | "createdDate" | "updatedDate"> {}
