"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const mongoose_1 = require("mongoose");
const base_repository_1 = require("../common/repositories/base.repository");
const user_model_1 = require("../modules/users/user.model");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_model_1.User);
    }
    async findByEmail(email) {
        return user_model_1.User.findOne({
            email,
        }).lean();
    }
    async findByTenant(tenantId) {
        return user_model_1.User.find({
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
        }).lean();
    }
    async findById(userId, tenantId) {
        return user_model_1.User.findOne({
            _id: new mongoose_1.Types.ObjectId(userId),
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
        }).lean();
    }
    async createUser(data) {
        return user_model_1.User.create(data);
    }
}
exports.userRepository = new UserRepository();
