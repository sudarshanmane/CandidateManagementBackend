import { Router } from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { validate } from "../../common/middlewares/validate.middleware";
import { createJobSchema, updateJobSchema } from "../../validation/jobs.validation";
import { createJob, getJobById, getJobs, updateJob } from "../../controllers/jobs/jobs.controller";

const jobRouter = Router();

jobRouter.use(authMiddleware);

jobRouter.post(
    "/",
    validate(createJobSchema),
    createJob
);

jobRouter.get(
    "/",
    getJobs
);

jobRouter.get(
    "/:jobId",
    getJobById
);

jobRouter.patch(
    "/:jobId",
    validate(updateJobSchema),
    updateJob
);

export default jobRouter;