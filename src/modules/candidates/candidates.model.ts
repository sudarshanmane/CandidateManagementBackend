import mongoose, { Schema, Document, Types } from "mongoose";

export const SCREENING_STATUS = {
    APPLIED: "applied",
    AWAITING_L1: "awaiting_l1",
    L1_SCHEDULED: "l1_scheduled",
    L1_COMPLETED: "l1_completed",
    AWAITING_L2: "awaiting_l2",
    L2_SCHEDULED: "l2_scheduled",
    L2_COMPLETED: "l2_completed",
    AWAITING_HR: "awaiting_hr",
    HR_SCHEDULED: "hr_scheduled",
    HR_COMPLETED: "hr_completed",
    AWAITING_MANAGERIAL: "awaiting_managerial",
    MANAGERIAL_SCHEDULED: "managerial_scheduled",
    MANAGERIAL_COMPLETED: "managerial_completed",
    OFFER_EXTENDED: "offer_extended",
    OFFER_ACCEPTED: "offer_accepted",
    OFFER_REJECTED: "offer_rejected",
    REJECTED: "rejected",
    WITHDRAWN: "withdrawn",
} as const;

export type CandidateStatusType = typeof SCREENING_STATUS[keyof typeof SCREENING_STATUS];

export interface ICandidate extends Document {
    // 1. Personal Info
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;

    // 2. Professional Info
    currentTitle?: string;
    currentCompany?: string;
    resumeUrl?: string;

    // 3. System Relationships
    jobId: Types.ObjectId;
    tenantId: Types.ObjectId;
    source: string;

    // 4. State Management
    status: CandidateStatusType;
    rejectionReason?: string;
    rejectedAtStage?: string;

    // 5. AI & Evaluation Data
    jdMatch: {
        overallScore: number;
        skillsMatch: number;
        experienceMatch: number;
        educationMatch: number;
        cultureFit: number;
        strengths: string[];
        gaps: string[];
    };

    // 🎯 6. Embedded Interviews (Fast reads, perfect for the Candidate Detail UI)
    interviews: Array<{
        roundName: string; // e.g., "Technical L1", "HR Round"
        interviewerId?: Types.ObjectId; // Who is conducting it
        scheduledAt?: Date;
        status: "SCHEDULED" | "COMPLETED" | "CANCELED";
        feedback?: {
            rating?: number;
            notes?: string;
            recommendation?: "HIRE" | "NO HIRE" | "PENDING";
        };
    }>;

    // 7. General Recruiter Notes
    notes: Array<{
        text: string;
        authorId: Types.ObjectId;
        createdAt: Date;
    }>;

    createdAt: Date;
    updatedAt: Date;
}

const CandidateSchema = new Schema<ICandidate>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true, trim: true },
        phone: { type: String, trim: true },
        location: { type: String, trim: true },

        currentTitle: { type: String, trim: true },
        currentCompany: { type: String, trim: true },
        resumeUrl: { type: String },

        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
        source: { type: String, default: "direct" },

        status: {
            type: String,
            enum: Object.values(SCREENING_STATUS),
            default: SCREENING_STATUS.APPLIED,
        },

        rejectionReason: { type: String },
        rejectedAtStage: { type: String },

        jdMatch: {
            overallScore: { type: Number, default: 0 },
            skillsMatch: { type: Number, default: 0 },
            experienceMatch: { type: Number, default: 0 },
            educationMatch: { type: Number, default: 0 },
            cultureFit: { type: Number, default: 0 },
            strengths: [{ type: String }],
            gaps: [{ type: String }],
        },

        interviews: [
            {
                roundName: { type: String, required: true },
                interviewerId: { type: Schema.Types.ObjectId, ref: "User" },
                scheduledAt: { type: Date },
                status: { type: String, enum: ["SCHEDULED", "COMPLETED", "CANCELED"], default: "SCHEDULED" },
                feedback: {
                    rating: { type: Number },
                    notes: { type: String },
                    recommendation: { type: String, enum: ["HIRE", "NO HIRE", "PENDING"] },
                },
            },
        ],

        notes: [
            {
                text: { type: String, required: true },
                authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

CandidateSchema.index({ email: 1, jobId: 1, tenantId: 1 }, { unique: true });

// NEW: Speeds up loading the Kanban board columns (e.g., "Get me all APPLIED candidates for Star Tech")
CandidateSchema.index({ tenantId: 1, status: 1 });

// NEW: Speeds up the "Search candidates..." search bar in your UI
CandidateSchema.index({ tenantId: 1, firstName: 1, lastName: 1 });

// NEW: Speeds up direct candidate lookups
CandidateSchema.index({ tenantId: 1, email: 1 });

export const CandidateModel = mongoose.model<ICandidate>("Candidate", CandidateSchema);