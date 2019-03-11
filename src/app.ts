import { RSA_NO_PADDING } from "constants";

const express = require("express");
const app: any = express();
const port: number = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.json());

import * as eventsRouter from "./routes/events";

app.use("/api/v1/event", eventsRouter.router);

app.listen(port, () => {
    console.log("eventshuffle implementation running on port " + port);
});