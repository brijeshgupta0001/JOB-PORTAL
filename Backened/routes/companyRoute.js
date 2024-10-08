import express from "express";
import isAuthenticated from "../middlewares/isauthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../Controllers/companyController.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);
router.route("/get").get(isAuthenticated, getCompany);

export default router;