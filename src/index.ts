import "reflect-metadata";
import dotenv from "dotenv";
import fs from "fs"
import app from './app';
import "./cnnPostgres";
import { getConnection } from "typeorm";

dotenv.config();


//if (!fs.existsSync(process.env.UPLOAD_DIR)) {
//    fs.mkdirSync(process.env.UPLOAD_DIR)
//}
    


const port = process.env.PORT || 3002;
    app.listen(port, () => {
        console.log("Server on port " + port );
    });

const gracefulShutdown = () => {
    getConnection().close()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown); // Sent by nodemon