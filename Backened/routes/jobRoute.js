import express from "express";
import isAuthenticated from "../middlewares/isauthenticated.js";
import { getAdminJobs, getAlljobs, getJobById, postJob } from "../Controllers/jobController.js";


const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAlljobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;