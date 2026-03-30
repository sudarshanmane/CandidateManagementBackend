import { Response } from "express";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { AuthRequest } from "../../common/types/auth-request..types";
import { jobService } from "../../services/jobs.service";
import { sendResponse } from "../../common/utils/response";

export const createJob = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = await jobService.createJob(
            req.body,
            req.user!.tenantId,
            req.user!.userId
        );

        sendResponse(res, {
            message: "Job posting created successfully",
            data: data,
        });
    }
);

export const getJobs = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = await jobService.getJobs(req.user!.tenantId, req.query);

        sendResponse(res, {
            message: "Jobs fetched successfully",
            data: data,
        });
    }
);

export const getJobById = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = await jobService.getJobById(req.params.jobId as string, req.user!.tenantId);

        sendResponse(res, {
            message: "Job details fetched successfully",
            data: data,
        });
    }
);

export const updateJob = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const data = await jobService.updateJob(
            req.params.jobId as string,
            req.user!.tenantId,
            req.body
        );

        sendResponse(res, {
            message: "Job posting updated successfully",
            data: data,
        });
    }
);