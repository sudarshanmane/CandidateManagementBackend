import { text } from "stream/consumers";
import { AppError } from "../common/error/errors";
import { ICandidate, SCREENING_STATUS } from "../modules/candidates/candidates.model";
import { candidateRepository } from "../repos/candidates.repository";
import { Types } from "mongoose";


export const createCandidateService = async (candidateData: Partial<ICandidate>, tenantId: string): Promise<ICandidate> => {
    const candidate = await candidateRepository.createCandidate(candidateData, tenantId);
    return candidate;
}

export const getCandidatesService = async (query: any): Promise<ICandidate[]> => {
    return await candidateRepository.getCandidates(query);
}

export const getCandidateByIdService = async (id: string, tenantId: string): Promise<ICandidate | null> => {
    return await candidateRepository.getCandidateById(id, tenantId);
}

export const updateCondidateStatusService = async (id: string, tenantId: string, status: string): Promise<ICandidate | null> => {
    return await candidateRepository.updateCandidate(id, tenantId, { status });
}

export const rejectCandidate = async (candidateId: string, tenantId: string, reason: string, stage: string) => {
    const updateData = {
        status: SCREENING_STATUS.REJECTED,
        rejectionReason: reason,
        rejectedAtStage: stage,
    };

    const rejectedCandidate = await candidateRepository.updateCandidate(candidateId, tenantId, updateData);

    if (!rejectedCandidate) {
        throw new AppError("Candidate Not Found!", 404);
    }
    return rejectedCandidate;
}

export const addInterviewRoundService = async (candidateId: string, tenantId: string, interviewRoundData: any): Promise<ICandidate | null> => {

    const interviewData = {
        ...interviewRoundData,
        status: "SCHEDULED",
    };

    const candidate = await candidateRepository.addInterviewRound(candidateId, tenantId, interviewData);
    if (!candidate) throw new AppError("Candidate Not Found!", 404);

    return candidate;
}

export const addNoteService = async (candidateId: string, tenantId: string, text: string, authorId: string,) => {
    const noteData = {
        text,
        authorId: new Types.ObjectId(authorId),
    };

    const candidate = await candidateRepository.addNote(candidateId, tenantId, noteData);
    if (!candidate) throw new AppError("Candidate Not Found!", 404);

    return candidate.notes;
}

export const updateInterviewFeedbackService = async (candidateId: string, tenantId: string, interviewId: string, feedbackData: any) => {

    const candidate = await candidateRepository.updateInterviewFeedback(candidateId, tenantId, interviewId, feedbackData);
    if (!candidate) throw new AppError("Candidate or Interview Round Not Found!", 404);

    return candidate.interviews;
}   