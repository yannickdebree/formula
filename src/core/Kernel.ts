import 'reflect-metadata';
import { Controller, hasControllerImplementedOnInit } from './controllers';
import { Container } from './di';

export class Kernel {
  constructor(private readonly controllers: Array<Controller>) {}

  run() {
    window.addEventListener('DOMContentLoaded', () => {
      const container = new Container();

      container.registerInstance(Window, window);

      try {
        throw new Error();
        this.controllers.forEach((controller) => {
          const instance = container.get(controller);
          if (hasControllerImplementedOnInit(instance)) {
            instance.onInit();
          }
        });
      } catch (err) {
        console.error('KERNEL ERROR: ', err);
      }
    });
  }
}
