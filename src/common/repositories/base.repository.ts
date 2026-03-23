import { Model, UpdateQuery } from "mongoose";

export class BaseRepository<T> {
  constructor(private model: Model<T>) {
    this.model = model;
  }

  async findOne(filter: Partial<T>) {
    return this.model.findOne(filter).lean();
  }

  async findMany(filter: Partial<T>) {
    return this.model.find(filter).lean();
  }

  async create(data: Partial<T>) {
    return this.model.create(data);
  }

  async update(filter: Partial<T>, data: UpdateQuery<T>) {
    return this.model.findOneAndUpdate(filter, data, { new: true });
  }

  async delete(filter: Partial<T>) {
    return this.model.deleteOne(filter);
  }
}
