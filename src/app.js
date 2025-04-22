/* installing project express only API
cmd: npx @kba-tools/create-express-app
ref: https://faustocintra.com.br/desenvolvimento-back-end/criando-um-projeto-express-js-em-2024/
*/

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index_router.js";
import artistsRouter from "./routes/artists_router.js";
import songsRouter from "./routes/songs_router.js";
import { errorHandler } from "./handler/errorHandler.js";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/artists", artistsRouter);
app.use("/songs", songsRouter);

app.use(errorHandler);

export default app;
