import { Response } from "express";
import { sendResponse } from "../../common/utils/response";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { AuthRequest } from "../../common/types/auth-request..types";
import { addInterviewRoundService, addNoteService, createCandidateService, getCandidateByIdService, getCandidatesService, rejectCandidate, updateCondidateStatusService, updateCondidateStatusService, updateInterviewFeedbackService } from '../../services/candidates.service';
import { AppError } from "../../common/error/errors";

export const createCandidateController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const tenantId = req.user?.tenantId;

    const data = await createCandidateService(req.body, tenantId!);

    sendResponse(res, {
        statusCode: 200,
        message: "success",
        data: data,
    });
});

export const getCandidatesController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const tenantId = req.user?.tenantId

    const { status, jobId, search } = req.query

    const query: any = { tenantId };
    if (jobId) query.jobId = jobId;
    if (status) query.status = status;

    if (search) {
        const searchRegex = new RegExp(search as string, 'i')
        query.$or = [
            { firstName: { $regex: searchRegex } },
            { lastName: { $regex: searchRegex } }
        ]
    }

    const candidates = await getCandidatesService(query);

    sendResponse(res, {
        statusCode: 200,
        message: "success",
        data: candidates,
    });
})

export const getCandidateByIdController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = req.params?.id as string;

    const tenantId = req.user?.tenantId as string;
    const candidate = await getCandidateByIdService(id, tenantId)
    res.status(200).json({ success: true, data: candidate });
})

export const updateCondidateStatusController = asyncHandler(async (req: AuthRequest, res: Response) => {

    let tenantId = req.user?.tenantId as string;
    let id = req.params?.id as string;
    let status = req.body.status as string;

    const candidate = await updateCondidateStatusService
        (id, tenantId, status);

    if (!candidate) throw new AppError("Candidate Not Found!", 404);


    sendResponse(res, {
        statusCode: 200,
        message: "Candidate Status Updated Successfully!",
        data: candidate,
    });
})


export const rejectCandidateController = asyncHandler(async (req: AuthRequest, res: Response) => {

    let id = req.params.id as string;
    let tenantId = req.user?.tenantId as string;

    let reason = req.body.reason as string;
    let stage = req.body.stage as string;

    let candidate = await rejectCandidate(id, tenantId, reason, stage)
    if (!candidate) throw new AppError("Candidate Not Found!", 404);

    sendResponse(res, {
        statusCode: 200,
        message: "Candidate Rejected Successfully!",
        data: candidate,
    });
})


export const addInterviewRoundController = asyncHandler(async (req: AuthRequest, res: Response) => {

    let id = req.params.id as string;
    let tenantId = req.user?.tenantId as string;
    let interviewRoundData = req.body as any;

    let candidate = await addInterviewRoundService(id, tenantId, interviewRoundData);

    sendResponse(res, {
        statusCode: 200,
        message: "Interview Round Added Successfully!",
        data: candidate
    });
})

export const submitInterviewFeedback = asyncHandler(async (req: AuthRequest, res: Response) => {

    let candidateId = req.params.id as string;
    let tenantId = req.user?.tenantId as string;
    let interviewId = req.params.interviewId as string;
    let feedbackData = req.body as any;

    let candidate = await updateInterviewFeedbackService(candidateId, tenantId, interviewId, feedbackData)
    if (!candidate) throw new AppError("Candidate Not Found!", 404);

    sendResponse(res, { statusCode: 200, message: "Interview Feedback Submitted Successfully!", data: candidate });

})

export const addNoteController = asyncHandler(async (req: AuthRequest, res: Response) => {

    let id = req.params.id as string;
    let tenantId = req.user?.tenantId as string;
    let noteData = req.body as any;

    let candidate = await addNoteService(id, tenantId, noteData.text, noteData.authorId);
    if (!candidate) throw new AppError("Candidate Not Found!", 404);
    sendResponse(res, { statusCode: 200, message: "Note Added Successfully!", data: candidate });
})