import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoutes.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRouter from "./routes/applicationRoute.js";
import path from "path"


const app = express();
dotenv.config({});

const _dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 3000;


app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRouter);

app.use(express.static(path.join(_dirname, "/Frontened/dist")))

app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontened", "dist", "index.html"));
})

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT}`);
})