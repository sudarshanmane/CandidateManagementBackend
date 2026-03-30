import { Types } from "mongoose";
import { IJob, JobModel } from "../modules/Jobs/jobs.module";

class JobRepository {
    async createJob(data: Partial<IJob>) {
        return await JobModel.create(data);
    }

    async findByTenant(tenantId: string, filters: any = {}) {
        const query: any = { tenantId: new Types.ObjectId(tenantId) };

        if (filters.status) query.status = filters.status;
        if (filters.department) query.department = filters.department;
        if (filters.search) {
            query.title = new RegExp(filters.search, "i");
        }

        return await JobModel.find(query)
            .sort({ createdAt: -1 })
            .populate("createdBy", "name email")
            .lean();
    }

    async findById(jobId: string, tenantId: string) {
        return await JobModel.findOne({
            _id: new Types.ObjectId(jobId),
            tenantId: new Types.ObjectId(tenantId),
        })
            .populate("createdBy", "name email")
            .lean();
    }

    async updateJob(jobId: string, tenantId: string, updateData: Partial<IJob>) {
        return await JobModel.findOneAndUpdate(
            {
                _id: new Types.ObjectId(jobId),
                tenantId: new Types.ObjectId(tenantId),
            },
            updateData,
            { new: true, runValidators: true }
        ).lean();
    }
}

export const jobRepository = new JobRepository();