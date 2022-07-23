const {clear} = require("@testing-library/user-event/dist/clear");
const Gpio = require('pigpio').Gpio;


module.exports.Engine = class {
    constructor(backPin, frontPin, rightPin, leftPin) {
        this.backWard = new Gpio(backPin, {mode: Gpio.OUTPUT});
        this.forWard = new Gpio(frontPin, {mode: Gpio.OUTPUT});
        this.rigthWard = new Gpio(rightPin, {mode: Gpio.OUTPUT});
        this.leftWard = new Gpio(leftPin, {mode: Gpio.OUTPUT});
        this.Speed = 0;
    }

    stop() {
        this.backWard.pwmWrite(0);
        this.forWard.pwmWrite(0);
        this.rigthWard.digitalWrite(0);
        this.leftWard.digitalWrite(0);
    }

    setSpeed(speed){

    }

    forward(){
        this.stop();
        this.forWard.pwmWrite(this.Speed);
    }
}
