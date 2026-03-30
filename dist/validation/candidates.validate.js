"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNoteSchema = exports.submitFeedbackSchema = exports.scheduleInterviewSchema = exports.rejectCandidateSchema = exports.updateStatusSchema = exports.createCandidateSchema = void 0;
const zod_1 = require("zod");
const SCREENING_STATUS = [
    "applied", "screening_scheduled", "screening_completed",
    "awaiting_l1", "l1_scheduled", "l1_completed",
    "awaiting_l2", "l2_scheduled", "l2_completed",
    "awaiting_hr", "hr_scheduled", "hr_completed",
    "awaiting_managerial", "managerial_scheduled", "managerial_completed",
    "offer_extended", "offer_accepted", "offer_rejected",
    "rejected", "withdrawn"
];
exports.createCandidateSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required").trim(),
    lastName: zod_1.z.string().min(1, "Last name is required").trim(),
    email: zod_1.z.string().email("Invalid email address").toLowerCase().trim(),
    phone: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    currentTitle: zod_1.z.string().optional(),
    currentCompany: zod_1.z.string().optional(),
    resumeUrl: zod_1.z.string().url("Invalid URL").optional().or(zod_1.z.literal("")),
    jobId: zod_1.z.string().min(24, "Invalid Job ID format"), // Validates it looks like a Mongo ObjectId
    source: zod_1.z.string().optional(),
});
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(SCREENING_STATUS),
});
exports.rejectCandidateSchema = zod_1.z.object({
    rejectionReason: zod_1.z.string().min(1, "Please provide a reason for rejection"),
    rejectedAtStage: zod_1.z.string().min(1, "Please specify the stage of rejection"),
});
// Add these schemas:
exports.scheduleInterviewSchema = zod_1.z.object({
    roundName: zod_1.z.string().min(1, "Round name is required"), // e.g., "Technical L1"
    interviewerId: zod_1.z.string().min(24, "Invalid user ID").optional(),
    scheduledAt: zod_1.z.string().datetime().optional(), // Expects ISO 8601 string
});
exports.submitFeedbackSchema = zod_1.z.object({
    rating: zod_1.z.number().min(1).max(5).optional(), // Or whatever scale you prefer
    notes: zod_1.z.string().min(1, "Feedback notes are required"),
    recommendation: zod_1.z.enum(["HIRE", "NO HIRE", "PENDING"]),
});
exports.addNoteSchema = zod_1.z.object({
    text: zod_1.z.string().min(1, "Note text cannot be empty"),
});
