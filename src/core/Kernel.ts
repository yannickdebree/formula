import 'reflect-metadata';
import { ContainerInstance } from "typedi";
import { Controller } from "./controllers";

export class Kernel {
    constructor(
        private readonly controllers: Array<Controller<any>>
    ) { }

    run() {
        window.addEventListener("DOMContentLoaded", () => {
            const container = new ContainerInstance(new Date().toISOString());
            container.set(Window, window);

            this.controllers.forEach(controller => {
                const instance = container.get(controller);
                if (!!instance['onInit']) {
                    instance.onInit();
                }
            })
        })
    }
}