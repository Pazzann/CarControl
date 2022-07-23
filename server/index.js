import Engine from "./engine";

const Gpio = require('pigpio').Gpio;

const led = new Gpio(16, {mode: Gpio.OUTPUT});

const backled = new Gpio(10, {mode: Gpio.OUTPUT});

let switcher = true;

const carEngine = new Engine(12, 13, 21, 20);

function ledswitch() {

    led.digitalWrite(1);
    console.log("set output to 1");

    setTimeout(() => {
        led.digitalWrite(0);
        console.log("set output to 0");
    }, 1000);
}

function backledswitch() {

    backled.digitalWrite((switcher) ? 1 : 0);
    console.log("set output to nn");

}


let distance = 0;
const MICROSECDONDS_PER_CM = 1e6 / 34321;

const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

const watchHCSR04 = () => {
    let startTick;
    echo.on('alert', (level, tick) => {
        if (level == 1) {
            startTick = tick;
        } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            distance = JSON.stringify({distance: diff / 2 / MICROSECDONDS_PER_CM});
        }
    });
};

watchHCSR04();

// Trigger a distance measurement once per second
setInterval(() => {
    trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);


const express = require("express");

const app = express();

const cors = require('cors');
app.use(cors({
    origin: ['http://192.168.0.112:4567', 'http://localhost:3000']
}))

app.get("/api/lamp", function (request, response) {
    ledswitch();
    console.log("requested");
    response.end();
});

app.get("/api/backlamp", function (request, response) {
    backledswitch();
    console.log("requested");
    response.end();
});

app.get("/api/hssr4", function (request, response) {
    console.log("requested");
    response.send(distance);
});

app.listen(4567);