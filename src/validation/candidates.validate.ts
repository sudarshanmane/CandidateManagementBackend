import { z } from "zod";

const SCREENING_STATUS = [
    "applied", "screening_scheduled", "screening_completed",
    "awaiting_l1", "l1_scheduled", "l1_completed",
    "awaiting_l2", "l2_scheduled", "l2_completed",
    "awaiting_hr", "hr_scheduled", "hr_completed",
    "awaiting_managerial", "managerial_scheduled", "managerial_completed",
    "offer_extended", "offer_accepted", "offer_rejected",
    "rejected", "withdrawn"
] as const;

export const createCandidateSchema = z.object({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().min(1, "Last name is required").trim(),
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    phone: z.string().optional(),
    location: z.string().optional(),

    currentTitle: z.string().optional(),
    currentCompany: z.string().optional(),
    resumeUrl: z.string().url("Invalid URL").optional().or(z.literal("")),

    jobId: z.string().min(24, "Invalid Job ID format"), // Validates it looks like a Mongo ObjectId
    source: z.string().optional(),
});

export const updateStatusSchema = z.object({
    status: z.enum(SCREENING_STATUS),
});

export const rejectCandidateSchema = z.object({
    rejectionReason: z.string().min(1, "Please provide a reason for rejection"),
    rejectedAtStage: z.string().min(1, "Please specify the stage of rejection"),
});

// Add these schemas:
export const scheduleInterviewSchema = z.object({
    roundName: z.string().min(1, "Round name is required"), // e.g., "Technical L1"
    interviewerId: z.string().min(24, "Invalid user ID").optional(),
    scheduledAt: z.string().datetime().optional(), // Expects ISO 8601 string
});

export const submitFeedbackSchema = z.object({
    rating: z.number().min(1).max(5).optional(), // Or whatever scale you prefer
    notes: z.string().min(1, "Feedback notes are required"),
    recommendation: z.enum(["HIRE", "NO HIRE", "PENDING"] as const),
});

export const addNoteSchema = z.object({
    text: z.string().min(1, "Note text cannot be empty"),
});
