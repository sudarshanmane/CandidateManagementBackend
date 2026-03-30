"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateRepository = void 0;
const mongoose_1 = require("mongoose");
const base_repository_1 = require("../common/repositories/base.repository");
const candidates_model_1 = require("../modules/candidates/candidates.model");
class CandidateRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(candidates_model_1.CandidateModel);
    }
    async createCandidate(candidateData, tenantId) {
        const candidate = await candidates_model_1.CandidateModel.create({ ...candidateData, tenantId });
        return candidate;
    }
    async getCandidates(filter) {
        return await candidates_model_1.CandidateModel.find(filter).lean();
    }
    async getCandidateById(id, tenantId) {
        return await candidates_model_1.CandidateModel.findOne({ _id: id, tenantId })
            .populate("interviews.interviewerId", "name email")
            .populate("notes.authorId", "name").lean();
    }
    async updateCandidate(candidateId, tenantId, updateData) {
        return await candidates_model_1.CandidateModel.findOneAndUpdate({
            _id: new mongoose_1.Types.ObjectId(candidateId),
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
        }, updateData, { new: true, runValidators: true }).lean();
    }
    async addInterviewRound(candidateId, tenantId, interviewRoundData) {
        return await candidates_model_1.CandidateModel.findOneAndUpdate({
            _id: new mongoose_1.Types.ObjectId(candidateId),
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
        }, { $push: { interviewRounds: interviewRoundData } }, { new: true, runValidators: true }).lean();
    }
    async addNote(candidateId, tenantId, noteData) {
        return await candidates_model_1.CandidateModel.findOneAndUpdate({ _id: new mongoose_1.Types.ObjectId(candidateId), tenantId: new mongoose_1.Types.ObjectId(tenantId) }, { $push: { notes: noteData } }, { new: true, runValidators: true })
            .populate("notes.authorId", "name")
            .lean();
    }
    async updateInterviewFeedback(candidateId, tenantId, interviewId, feedbackData) {
        return await candidates_model_1.CandidateModel.findOneAndUpdate({
            _id: new mongoose_1.Types.ObjectId(candidateId),
            tenantId: new mongoose_1.Types.ObjectId(tenantId),
            "interviews._id": new mongoose_1.Types.ObjectId(interviewId),
        }, {
            $set: {
                "interviews.$.status": "COMPLETED",
                "interviews.$.feedback": feedbackData,
            },
        }, { new: true, runValidators: true }).lean();
    }
}
exports.candidateRepository = new CandidateRepository();
