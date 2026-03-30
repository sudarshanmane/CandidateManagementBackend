"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModel = exports.SCREENING_STATUS = void 0;
const mongoose_1 = __importStar(require("mongoose"));
require("../users/user.model");
exports.SCREENING_STATUS = {
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
};
const CandidateSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    currentTitle: { type: String, trim: true },
    currentCompany: { type: String, trim: true },
    resumeUrl: { type: String },
    jobId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Job", required: true },
    tenantId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    source: { type: String, default: "direct" },
    status: {
        type: String,
        enum: Object.values(exports.SCREENING_STATUS),
        default: exports.SCREENING_STATUS.APPLIED,
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
            interviewerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
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
            authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
CandidateSchema.index({ email: 1, jobId: 1, tenantId: 1 }, { unique: true });
// NEW: Speeds up loading the Kanban board columns (e.g., "Get me all APPLIED candidates for Star Tech")
CandidateSchema.index({ tenantId: 1, status: 1 });
// NEW: Speeds up the "Search candidates..." search bar in your UI
CandidateSchema.index({ tenantId: 1, firstName: 1, lastName: 1 });
// NEW: Speeds up direct candidate lookups
CandidateSchema.index({ tenantId: 1, email: 1 });
exports.CandidateModel = mongoose_1.default.model("Candidate", CandidateSchema);
