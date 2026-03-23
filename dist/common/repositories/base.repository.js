"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
        this.model = model;
    }
    async findOne(filter) {
        return this.model.findOne(filter).lean();
    }
    async findMany(filter) {
        return this.model.find(filter).lean();
    }
    async create(data) {
        return this.model.create(data);
    }
    async update(filter, data) {
        return this.model.findOneAndUpdate(filter, data, { new: true });
    }
    async delete(filter) {
        return this.model.deleteOne(filter);
    }
}
exports.BaseRepository = BaseRepository;
