const {DistanceMeter} = require('./distance');
const Gpio = require('pigpio').Gpio;


interface Config {
    safeMode: boolean,
}

// interface Vec2 {
//     x: number,
//     y: number
// }

export type WheelDirection = -1 | 0 | 1;

// class MovementController{
//     public direction: Vec2 = {x: 0, y: 0};
//
//     private calculate(){
//
//     }
// }

module.exports.Engine = class{
    private backWard: any;
    private forWard: any;
    private rightWard: any;
    private leftWard: any;
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
        if (dir === 0){
            this.stopRotation();
        }else if (dir === -1){
            this.stopRotation();
            this.left();
        }else{
            this.stopRotation();
            this.right();
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

    forwardTime(time: number) {
        this.forward();
        setTimeout(this.stopMoving, time);
    }

    backwardTime(time: number) {
        this.backward();
        setTimeout(this.stopMoving, time);
    }

}
