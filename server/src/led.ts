import {Gpio} from "pigpio";

interface Config {
    type: "ON/OFF" | "ON"
}


export default class Led {
    private led;
    private config;
    private on_off: boolean = true;

    constructor(ledPin: number,
                config: Config = {
                    type: "ON"
                }) {
        this.led = new Gpio(ledPin, {mode: Gpio.OUTPUT});
        this.config = config;
    }

    switchLed() {
        switch (this.config.type) {
            case "ON":
                this.led.digitalWrite((this.on_off) ? 1 : 0);
                this.on_off = !this.on_off;
                break;
            case "ON/OFF":
                this.led.digitalWrite(1);

                setTimeout(() => {
                    this.led.digitalWrite(0);
                }, 100);
                break;
            default:
                throw new Error("Type of led is incorrect!");
        }

    }
}