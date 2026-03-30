import { Types } from "mongoose";
import { JOB_STATUS } from "../modules/Jobs/jobs.module";
import { jobRepository } from "../repos/jobs.repository";
import { AppError } from "../common/error/errors";

export const jobService = {
    createJob: async (data: any, tenantId: string, userId: string) => {
        const jobData = {
            ...data,
            tenantId: new Types.ObjectId(tenantId),
            createdBy: new Types.ObjectId(userId), // Tracks who made the posting
            status: data.status || JOB_STATUS.DRAFT, // Default to draft if not specified
        };

        return await jobRepository.createJob(jobData);
    },

    getJobs: async (tenantId: string, filters: any) => {
        return await jobRepository.findByTenant(tenantId, filters);
    },

    getJobById: async (jobId: string, tenantId: string) => {
        const job = await jobRepository.findById(jobId, tenantId);
        if (!job) {
            throw new AppError("Job Posting Not Found!", 404);
        }
        return job;
    },

    updateJob: async (jobId: string, tenantId: string, updateData: any) => {
        delete updateData.tenantId;
        delete updateData.createdBy;

        const updatedJob = await jobRepository.updateJob(jobId, tenantId, updateData);
        if (!updatedJob) {
            throw new AppError("Job Posting Not Found!", 404);
        }
        return updatedJob;
    },
};