import DistanceMeter from "./distance";

const Gpio: any = require('pigpio').Gpio;


interface Config {
    safeMode: boolean,
    distanceMeter: DistanceMeter | null,
}

export default class Engine implements Config {
    private backWard;
    private forWard;
    private rightWard;
    private leftWard;
    private Speed;
    private config;

    constructor(frontPin: number,
                backPin: number,
                rightPin: number,
                leftPin: number,
                config: Config =
                    {
                        safeMode: true,
                        distanceMeter: null
                    }) {
        this.backWard = new Gpio(backPin, {mode: Gpio.OUTPUT});
        this.forWard = new Gpio(frontPin, {mode: Gpio.OUTPUT});
        this.rightWard = new Gpio(rightPin, {mode: Gpio.OUTPUT});
        this.leftWard = new Gpio(leftPin, {mode: Gpio.OUTPUT});
        this.Speed = 0;
        this.config = config;
    }

    stopMoving() {
        this.backWard.pwmWrite(0);
        this.forWard.pwmWrite(0);
    }

    stopRotation() {
        this.rightWard.digitalWrite(0);
        this.leftWard.digitalWrite(0);
    }

    completeStop() {
        this.backWard.pwmWrite(0);
        this.forWard.pwmWrite(0);
        this.rightWard.digitalWrite(0);
        this.leftWard.digitalWrite(0);
    }

    setSpeed(speed: number) {
        this.Speed = speed;
    }

    forward() {
        if(this.config.safeMode){
            console.log("Error: you're in safeMode, change the config or use forwardTime!");
            return;
        }

        this.stopMoving();
        this.forWard.pwmWrite(this.Speed);
    }

    backward() {
        if(this.config.safeMode){
            console.log("Error: you're in safeMode, change the config or use backwardTime!");
            return;
        }
        this.stopMoving();
        this.backWard.pwmWrite(this.Speed);
    }

    right() {
        if(this.config.safeMode){
            console.log("Error: you're in safeMode, change the config or use rightTime!");
            return;
        }
        this.stopRotation();
        this.rightWard.digitalWrite(1);

    }

    left() {
        if(this.config.safeMode){
            console.log("Error: you're in safeMode, change the config or use leftTime!");
            return;
        }
        this.stopRotation();
        this.leftWard.digitalWrite(1);
    }

    forwardTime(time: number) {
        this.forward();
        setTimeout(this.stopMoving, time);
    }

    backwardTime(time: number) {
        this.backward();
        setTimeout(this.stopMoving, time);
    }

    rightTime(time: number) {
        this.right();
        setTimeout(this.stopRotation, time);
    }

    leftTime(time: number) {
        this.left();
        setTimeout(this.stopRotation, time);
    }
}
