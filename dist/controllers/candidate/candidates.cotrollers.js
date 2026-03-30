"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNoteController = exports.submitInterviewFeedback = exports.addInterviewRoundController = exports.rejectCandidateController = exports.updateCondidateStatusController = exports.getCandidateByIdController = exports.getCandidatesController = exports.createCandidateController = void 0;
const response_1 = require("../../common/utils/response");
const asyncHandler_1 = require("../../common/utils/asyncHandler");
const candidates_service_1 = require("../../services/candidates.service");
const errors_1 = require("../../common/error/errors");
exports.createCandidateController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const tenantId = req.user?.tenantId;
    const data = await (0, candidates_service_1.createCandidateService)(req.body, tenantId);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        message: "success",
        data: data,
    });
});
exports.getCandidatesController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const tenantId = req.user?.tenantId;
    const { status, jobId, search } = req.query;
    const query = { tenantId };
    if (jobId)
        query.jobId = jobId;
    if (status)
        query.status = status;
    if (search) {
        const searchRegex = new RegExp(search, 'i');
        query.$or = [
            { firstName: { $regex: searchRegex } },
            { lastName: { $regex: searchRegex } }
        ];
    }
    const candidates = await (0, candidates_service_1.getCandidatesService)(query);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        message: "success",
        data: candidates,
    });
});
exports.getCandidateByIdController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = req.params?.id;
    const tenantId = req.user?.tenantId;
    const candidate = await (0, candidates_service_1.getCandidateByIdService)(id, tenantId);
    res.status(200).json({ success: true, data: candidate });
});
exports.updateCondidateStatusController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    let tenantId = req.user?.tenantId;
    let id = req.params?.id;
    let status = req.body.status;
    const candidate = await (0, candidates_service_1.updateCondidateStatusService)(id, tenantId, status);
    if (!candidate)
        throw new errors_1.AppError("Candidate Not Found!", 404);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        message: "Candidate Status Updated Successfully!",
        data: candidate,
    });
});
exports.rejectCandidateController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    let id = req.params.id;
    let tenantId = req.user?.tenantId;
    let reason = req.body.reason;
    let stage = req.body.stage;
    let candidate = await (0, candidates_service_1.rejectCandidate)(id, tenantId, reason, stage);
    if (!candidate)
        throw new errors_1.AppError("Candidate Not Found!", 404);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        message: "Candidate Rejected Successfully!",
        data: candidate,
    });
});
exports.addInterviewRoundController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    let id = req.params.id;
    let tenantId = req.user?.tenantId;
    let interviewRoundData = req.body;
    let candidate = await (0, candidates_service_1.addInterviewRoundService)(id, tenantId, interviewRoundData);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        message: "Interview Round Added Successfully!",
        data: candidate
    });
});
exports.submitInterviewFeedback = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    let candidateId = req.params.id;
    let tenantId = req.user?.tenantId;
    let interviewId = req.params.interviewId;
    let feedbackData = req.body;
    let candidate = await (0, candidates_service_1.updateInterviewFeedbackService)(candidateId, tenantId, interviewId, feedbackData);
    if (!candidate)
        throw new errors_1.AppError("Candidate Not Found!", 404);
    (0, response_1.sendResponse)(res, { statusCode: 200, message: "Interview Feedback Submitted Successfully!", data: candidate });
});
exports.addNoteController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    let id = req.params.id;
    let tenantId = req.user?.tenantId;
    let noteData = req.body;
    let candidate = await (0, candidates_service_1.addNoteService)(id, tenantId, noteData.text, noteData.authorId);
    (0, response_1.sendResponse)(res, { statusCode: 200, message: "Note Added Successfully!", data: candidate });
});
