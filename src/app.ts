import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { createConnection } from 'typeorm';
//import throttle from 'express-throttle-bandwidth';
import path from "path";
import dotenv from "dotenv";

import authRoute from './routes/auth';
import loginRoute from './routes/userLogin';
import userRoute from './routes/user';
import schoolRoute from "./routes/school";
import schoolTypeRoute from "./routes/schoolType";
import studentTypeRoute from "./routes/studentType";
import studentRoute from "./routes/student";
import typesRoute from "./routes/types";
import uploadsRoute from "./routes/upload";

dotenv.config();

const app = express();

// middlewares
//app.use("/public", express.static(process.env.UPLOAD_DIR));
//app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//app.use(throttle(1024 * 128))
// routes
app.use("/api/auth", authRoute);
app.use("/api/login", loginRoute);
app.use("/api/user", userRoute);
app.use("/api/school", schoolRoute);
// types
app.use("/api/type", typesRoute);
app.use("/api/school-type", schoolTypeRoute);
app.use("/api/student-type", studentTypeRoute);
// students
app.use("/api/student", studentRoute);
//

//uploads
app.use("/api/upload", uploadsRoute);

export default app;