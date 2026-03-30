import mongoose, { Schema, Types } from "mongoose";



export const JOB_STATUS = {
    DRAFT: "draft",
    OPEN: "open",
    ON_HOLD: "on_hold",
    CLOSED: "closed",
} as const;

export type JobStatusType = typeof JOB_STATUS[keyof typeof JOB_STATUS];

export interface IJob extends Document {
    _id: Types.ObjectId,
    title: string,
    department: string,
    location: string,
    description: string,
    employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship',
    workModel: 'On-site' | 'Remote' | 'Hybrid',
    requirements: string[],
    experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead',
    skills: string[],
    experienceRequired: string,
    salaryRange?: {
        min?: number;
        max?: number;
        currency?: string;
    };

    status: JobStatusType;
    tenantId: Types.ObjectId;
    createdBy: Types.ObjectId; // The user who created the job posting
    createdAt: Date;
    updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
    {
        title: { type: String, required: true, trim: true },
        department: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        employmentType: { type: String, required: true },
        workModel: { type: String, required: true, enum: ["On-site", "Remote", "Hybrid"] },

        description: { type: String, required: true },
        requirements: [{ type: String }],
        skills: [{ type: String }],

        experienceLevel: { type: String, required: true },
        salaryRange: {
            min: { type: Number },
            max: { type: Number },
            currency: { type: String, default: "USD" },
        },

        status: {
            type: String,
            enum: Object.values(JOB_STATUS),
            default: JOB_STATUS.DRAFT,
        },

        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

// 🎯 Performance Indexes
// 1. Instantly load the recruiter's dashboard (e.g., "Show me all OPEN jobs for Star Tech")
JobSchema.index({ tenantId: 1, status: 1 });
// 2. Fast text search for jobs
JobSchema.index({ tenantId: 1, title: 1 });

export const JobModel = mongoose.model<IJob>("Job", JobSchema);