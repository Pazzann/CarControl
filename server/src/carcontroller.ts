import Engine from "./engine";
import DistanceMeter from "./distance";

const distanceMeter = new DistanceMeter(23, 24);
distanceMeter.startMeasuring();


const carEngine = new Engine(13, 12, 21, 20, {safeMode: true});
carEngine.completeStop();

const express = require("express");

const app = express();

const cors = require('cors');
app.use(cors({
    origin: ['http://192.168.0.112:4567', 'http://localhost:3000']
}))

// app.get("/api/lamp", function (request: any, response: any) {
//     ledswitch();
//     console.log("requested");
//     response.end();
// });
//
// app.get("/api/backlamp", function (request: any, response: any) {
//     backledswitch();
//     console.log("requested");
//     response.end();
// });

app.get("/api/hssr4", function (request: any, response: any) {
    console.log("requested");
    response.send(JSON.stringify({distance: distanceMeter.distance}));
});

app.listen(4567, "localhost");

console.log("Started!");