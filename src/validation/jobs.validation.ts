import { z } from "zod";

const JOB_STATUS_ENUM = ["draft", "open", "on_hold", "closed"] as const;
const EMPLOYMENT_TYPE_ENUM = ["Full-time", "Part-time", "Contract", "Internship"] as const;
const WORK_MODEL_ENUM = ["On-site", "Remote", "Hybrid"] as const;

export const createJobSchema = z.object({
    title: z.string().min(2, "Job title is required").trim(),
    department: z.string().min(2, "Department is required").trim(),
    location: z.string().min(2, "Location is required").trim(),
    employmentType: z.enum(EMPLOYMENT_TYPE_ENUM),
    workModel: z.enum(WORK_MODEL_ENUM),

    description: z.string().min(10, "Description is too short"),
    requirements: z.array(z.string()).min(1, "At least one requirement is needed"),
    skills: z.array(z.string()).min(1, "At least one skill is needed"),

    experienceLevel: z.string().min(1, "Experience level is required"),
    salaryRange: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
        currency: z.string().default("USD").optional(),
    }).optional(),

    status: z.enum(JOB_STATUS_ENUM).optional(),
});

export const updateJobSchema = z.object({
    ...createJobSchema.shape,
    title: createJobSchema.shape.title.optional(),
    department: createJobSchema.shape.department.optional(),
    location: createJobSchema.shape.location.optional(),
    employmentType: createJobSchema.shape.employmentType.optional(),
    workModel: createJobSchema.shape.workModel.optional(),
    description: createJobSchema.shape.description.optional(),
    requirements: createJobSchema.shape.requirements.optional(),
    skills: createJobSchema.shape.skills.optional(),
    experienceLevel: createJobSchema.shape.experienceLevel.optional(),
    salaryRange: createJobSchema.shape.salaryRange.optional(),
    status: createJobSchema.shape.status.optional(),
});