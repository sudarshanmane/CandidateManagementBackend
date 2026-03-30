"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInterviewFeedbackService = exports.addNoteService = exports.addInterviewRoundService = exports.rejectCandidate = exports.updateCondidateStatusService = exports.getCandidateByIdService = exports.getCandidatesService = exports.createCandidateService = void 0;
const errors_1 = require("../common/error/errors");
const candidates_model_1 = require("../modules/candidates/candidates.model");
const candidates_repository_1 = require("../repos/candidates.repository");
const mongoose_1 = require("mongoose");
const createCandidateService = async (candidateData, tenantId) => {
    const candidate = await candidates_repository_1.candidateRepository.createCandidate(candidateData, tenantId);
    return candidate;
};
exports.createCandidateService = createCandidateService;
const getCandidatesService = async (query) => {
    return await candidates_repository_1.candidateRepository.getCandidates(query);
};
exports.getCandidatesService = getCandidatesService;
const getCandidateByIdService = async (id, tenantId) => {
    return await candidates_repository_1.candidateRepository.getCandidateById(id, tenantId);
};
exports.getCandidateByIdService = getCandidateByIdService;
const updateCondidateStatusService = async (id, tenantId, status) => {
    return await candidates_repository_1.candidateRepository.updateCandidate(id, tenantId, { status });
};
exports.updateCondidateStatusService = updateCondidateStatusService;
const rejectCandidate = async (candidateId, tenantId, reason, stage) => {
    const updateData = {
        status: candidates_model_1.SCREENING_STATUS.REJECTED,
        rejectionReason: reason,
        rejectedAtStage: stage,
    };
    const rejectedCandidate = await candidates_repository_1.candidateRepository.updateCandidate(candidateId, tenantId, updateData);
    if (!rejectedCandidate) {
        throw new errors_1.AppError("Candidate Not Found!", 404);
    }
    return rejectedCandidate;
};
exports.rejectCandidate = rejectCandidate;
const addInterviewRoundService = async (candidateId, tenantId, interviewRoundData) => {
    const interviewData = {
        ...interviewRoundData,
        status: "SCHEDULED",
    };
    const candidate = await candidates_repository_1.candidateRepository.addInterviewRound(candidateId, tenantId, interviewData);
    if (!candidate)
        throw new errors_1.AppError("Candidate Not Found!", 404);
    return candidate;
};
exports.addInterviewRoundService = addInterviewRoundService;
const addNoteService = async (candidateId, tenantId, text, authorId) => {
    const noteData = {
        text,
        authorId: new mongoose_1.Types.ObjectId(authorId),
    };
    const candidate = await candidates_repository_1.candidateRepository.addNote(candidateId, tenantId, noteData);
    if (!candidate)
        throw new errors_1.AppError("Candidate Not Found!", 404);
    return candidate.notes;
};
exports.addNoteService = addNoteService;
const updateInterviewFeedbackService = async (candidateId, tenantId, interviewId, feedbackData) => {
    const candidate = await candidates_repository_1.candidateRepository.updateInterviewFeedback(candidateId, tenantId, interviewId, feedbackData);
    if (!candidate)
        throw new errors_1.AppError("Candidate or Interview Round Not Found!", 404);
    return candidate.interviews;
};
exports.updateInterviewFeedbackService = updateInterviewFeedbackService;
