import Engine from "./engine";
import DistanceMeter from "./distance";
import Led from "./led";

//parts initialisation

//hs-sr04
const distanceMeter = new DistanceMeter(23, 24);
distanceMeter.startMeasuring();

//engines
const carEngine = new Engine(13, 12, 21, 20, {safeMode: true, distanceMeter});
carEngine.completeStop();

//leds
const frontLed = new Led(16, {type: "ON/OFF"});
const backLed = new Led(10, {type: "ON"});

//express server initialisation
const express = require("express");
const app = express();

// cors headers
const cors = require('cors');
app.use(cors({
    origin: ['http://192.168.0.112:4567', 'http://localhost:3000']
}))


//api responses

//frontLed
app.get("/api/lamp", function (request: any, response: any) {
    frontLed.switchLed();
    response.end();
});

//backLed
app.get("/api/backlamp", function (request: any, response: any) {
    backLed.switchLed();
    response.end();
});

//distance component response
app.get("/api/hssr4", function (request: any, response: any) {
    response.send(JSON.stringify({distance: distanceMeter.distance}));
});

app.listen(4567, "localhost");
console.log("Started at http://localhost:4567!");