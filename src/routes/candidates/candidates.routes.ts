import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { addNoteSchema, createCandidateSchema, rejectCandidateSchema, scheduleInterviewSchema, submitFeedbackSchema, updateStatusSchema, } from "../../validation/candidates.validate";
import { validate } from "../../common/middlewares/validate.middleware";
import { addInterviewRoundController, addNoteController, createCandidateController, getCandidateByIdController, getCandidatesController, rejectCandidateController, submitInterviewFeedback, updateCondidateStatusController } from "../../controllers/candidate/candidates.cotrollers";


const candidateRouter = Router();

candidateRouter.use(authMiddleware);

candidateRouter.post(
    "/",
    validate(createCandidateSchema),
    createCandidateController
);

candidateRouter.get(
    "/",
    getCandidatesController
);

candidateRouter.get(
    "/:candidateId",
    getCandidateByIdController
);

candidateRouter.patch(
    "/:candidateId/status",
    validate(updateStatusSchema),
    updateCondidateStatusController
);

candidateRouter.patch(
    "/:candidateId/reject",
    validate(rejectCandidateSchema),
    rejectCandidateController
);

candidateRouter.post(
    "/:candidateId/interviews",
    validate(scheduleInterviewSchema),
    addInterviewRoundController
);

candidateRouter.patch(
    "/:candidateId/interviews/:interviewId/feedback",
    validate(submitFeedbackSchema),
    submitInterviewFeedback
);

candidateRouter.post(
    "/:candidateId/notes",
    validate(addNoteSchema),
    addNoteController
);



export default candidateRouter;