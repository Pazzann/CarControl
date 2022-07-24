import Engine from "./src/carcomponents/engine";
import DistanceMeter from "./src/carcomponents/distanceMeterHSSR04";
import Led from "./src/carcomponents/led";
import {Car} from "./src/car";
import MovementController from "./src/carcomponents/movementController";

const car = new Car({
    engine: new Engine(13, 12, 21, 20, {safeMode: true}),
    distanceMeter: new DistanceMeter(23, 24),
    movementController: new MovementController(),
    leds: [
        [1, new Led(16, {type: "ON/OFF"})],
        [2, new Led(10, {type: "ON"})]
    ]
});

car.distanceMeter.startMeasuring();
car.engine.completeStop();


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
    car.switchLedById(1);
    response.end();
});

//backLed
app.get("/api/backlamp", function (request: any, response: any) {
    car.switchLedById(2);
    response.end();
});

//distance component response
app.get("/api/hssr4", function (request: any, response: any) {
    response.send(JSON.stringify({distance: car.distanceMeter.distance}));
});

app.listen(4567, "localhost");
console.log("Started at http://localhost:4567!");