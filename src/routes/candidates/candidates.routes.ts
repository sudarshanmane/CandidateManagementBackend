import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { createCandidateSchema, rejectCandidateSchema, updateStatusSchema, } from "../../validation/candidates.validate";
import { validate } from "../../common/middlewares/validate.middleware";
import { createCandidateController, getCandidateByIdController, getCandidatesController, rejectCandidateController, updateCondidateStatusController } from "../../controllers/candidate/candidates.cotrollers";


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

export default candidateRouter;