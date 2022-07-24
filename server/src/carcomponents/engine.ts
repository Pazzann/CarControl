import DistanceMeter from "./distanceMeterHSSR04";
import {Gpio} from "pigpio";


interface Config {
    safeMode: boolean,
}

export type WheelDirection = "LEFT" | "STOP" | "RIGHT";

export default class Engine {
    private backWard;
    private forWard;
    private rightWard;
    private leftWard;
    private Speed: number;
    private config: Config;


    constructor(frontPin: number,
                backPin: number,
                rightPin: number,
                leftPin: number,
                config: Config =
                    {
                        safeMode: true,
                    }) {
        this.backWard = new Gpio(backPin, {mode: Gpio.OUTPUT});
        this.forWard = new Gpio(frontPin, {mode: Gpio.OUTPUT});
        this.rightWard = new Gpio(rightPin, {mode: Gpio.OUTPUT});
        this.leftWard = new Gpio(leftPin, {mode: Gpio.OUTPUT});
        this.Speed = 0;
        this.config = config;
    }

    public stopMoving() {
        this.backWard.pwmWrite(0);
        this.forWard.pwmWrite(0);
    }

    public stopRotation() {
        this.rightWard.digitalWrite(0);
        this.leftWard.digitalWrite(0);
    }

    public completeStop() {
        this.backWard.pwmWrite(0);
        this.forWard.pwmWrite(0);
        this.rightWard.digitalWrite(0);
        this.leftWard.digitalWrite(0);
    }

    public setSpeed(speed: number) {
        this.Speed = speed;
    }

    public setRPM(rpm: number){
        if(this.config.safeMode){
            console.log("Error: you're in safeMode, change the config or use direction + Time!");
            return;
        }

        if(Math.abs(rpm) >= 1024) throw new Error("Value does not meet criteria(-1024 -> 1024)");

        if(rpm == 0){
            this.stopMoving();
        }else if(rpm > 0){
            this.setSpeed(rpm);
            this.forward();
        }else if(rpm < 0){
            this.setSpeed(rpm * -1);
            this.backward();
        }
    }


    public setRotation(dir: WheelDirection){
        if (dir === "STOP"){
            this.stopRotation();
        }else if (dir === "LEFT"){
            this.stopRotation();
            this.left();
        }else if (dir === "RIGHT"){
            this.stopRotation();
            this.right();
        }else{
            throw new Error("Value does not meet criteria(LEFT | STOP | RIGHT)");
        }
    }

    public forward() {
        if(this.config.safeMode){
            console.log("Error: you're in safeMode, change the config or use forwardTime!");
            return;
        }

        this.stopMoving();
        this.forWard.pwmWrite(this.Speed);
    }

    public backward() {
        if(this.config.safeMode){
            console.log("Error: you're in safeMode, change the config or use backwardTime!");
            return;
        }
        this.stopMoving();
        this.backWard.pwmWrite(this.Speed);
    }

    public right() {
        this.stopRotation();
        this.rightWard.digitalWrite(1);

    }

    public left() {
        this.stopRotation();
        this.leftWard.digitalWrite(1);
    }

    public forwardTime(time: number) {
        this.forward();
        setTimeout(this.stopMoving, time);
    }

    public backwardTime(time: number) {
        this.backward();
        setTimeout(this.stopMoving, time);
    }

}
