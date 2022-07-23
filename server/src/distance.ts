import {clearInterval} from "timers";
const Gpio = require('pigpio').Gpio;



interface Config {
    tickTime: number,
}

module.exports.DistanceMeter = class {
    private echo: any;
    private trigger: any;
    private MICROSECDONDS_PER_CM: number = 1e6 / 34321;
    private _distance: number = 0;
    private config: Config;
    private currentTicking: any;


    private watchHCSR04() {
        let startTick: number;


        this.echo.on('alert', (level: any, tick: number) => {
            if (level == 1) {
                startTick = tick;
            } else {
                const endTick: number = tick;
                const diff: number = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
                this._distance = diff / 2 / this.MICROSECDONDS_PER_CM;
            }
        });
    }

    constructor(triggerPin: number,
                echoPin: number,
                config: Config = {
                    tickTime: 1000,
                }) {
        this.echo = new Gpio(echoPin, {mode: Gpio.INPUT, alert: true});
        this.trigger = new Gpio(triggerPin, {mode: Gpio.OUTPUT});
        this.trigger.digitalWrite(0);
        this.config = config;
    }

    startMeasuring(){
        this.watchHCSR04();
        this.currentTicking = setInterval(() => {
            this.trigger.trigger(10, 1); // Set trigger high for 10 microseconds
        }, this.config.tickTime);
    }

    changeTickTime(newtickTime: number){
        this.config.tickTime = newtickTime;
        clearInterval(this.currentTicking);
        this.currentTicking = setInterval(() => {
            this.trigger.trigger(10, 1); // Set trigger high for 10 microseconds
        }, this.config.tickTime);
    }

    get distance() {
        return this._distance;
    }
}