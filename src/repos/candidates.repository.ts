import { Types } from "mongoose";
import { BaseRepository } from "../common/repositories/base.repository";
import { CandidateModel, ICandidate } from "../modules/candidates/candidates.model";

class CandidateRepository extends BaseRepository<ICandidate> {

    constructor() {
        super(CandidateModel);
    }

    async createCandidate(candidateData: Partial<ICandidate>, tenantId: string): Promise<ICandidate> {
        const candidate = await CandidateModel.create({ ...candidateData, tenantId });
        return candidate
    }

    async getCandidates(filter: Partial<any>): Promise<ICandidate[]> {
        return await CandidateModel.find(filter).lean<ICandidate[]>();
    }

    async getCandidateById(id: string, tenantId: string): Promise<ICandidate | null> {
        return await CandidateModel.findOne({ _id: id, tenantId })
            .populate("interviews.interviewerId", "name email")
            .populate("notes.authorId", "name").lean<ICandidate | null>();
    }


    async updateCandidate(candidateId: string, tenantId: string, updateData: any): Promise<ICandidate | null> {
        return await CandidateModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(candidateId),
                tenantId: new Types.ObjectId(tenantId),
            },
            updateData,
            { new: true, runValidators: true }
        ).lean();
    }

    async addInterviewRound(candidateId: string, tenantId: string, interviewRoundData: any): Promise<ICandidate | null> {
        let candidate = await CandidateModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(candidateId),
                tenantId: new Types.ObjectId(tenantId),
            },
            { $push: { interviews: interviewRoundData } },
            { new: true, runValidators: true }
        )
            .populate("interviews.interviewerId", "name email")
            .lean();

        console.log(candidate)

        return candidate;

    }

    async addNote(candidateId: string, tenantId: string, noteData: any) {
        return await CandidateModel.findOneAndUpdate(
            { _id: new Types.ObjectId(candidateId), tenantId: new Types.ObjectId(tenantId) },
            { $push: { notes: noteData } },
            { new: true, runValidators: true }
        )
            .populate("notes.authorId", "name")
            .lean();
    }

    async updateInterviewFeedback(candidateId: string, tenantId: string, interviewId: string, feedbackData: any) {
        return await CandidateModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(candidateId),
                tenantId: new Types.ObjectId(tenantId),
                "interviews._id": new Types.ObjectId(interviewId),
            },
            {
                $set: {
                    "interviews.$.status": "COMPLETED",
                    "interviews.$.feedback": feedbackData,
                },
            },
            { new: true, runValidators: true }
        ).lean();
    }
}


export const candidateRepository = new CandidateRepository();
