import Engine from "./carcomponents/engine";
import DistanceMeter from "./carcomponents/distanceMeterHSSR04";
import Led from "./carcomponents/led";
import MovementController from "./carcomponents/movementController";

export type ledId = number;



interface CarModules{
    engine: Engine | null,
    distanceMeter: DistanceMeter | null,
    movementController: MovementController | null,
    leds: Array<[ledId, Led]>| null
}


export class Car {
    engine;
    distanceMeter;
    movementController;
    private leds = new Map();
    constructor (carmodules: CarModules){
        this.engine = carmodules.engine;
        this.distanceMeter = carmodules.distanceMeter;
        this.movementController = carmodules.movementController;
        for (let [id, led] of carmodules.leds){
            this.leds.set(id, led);
        }
    }

    switchLedById(id: number){
        this.leds.get(id).switchLed();
    }
}