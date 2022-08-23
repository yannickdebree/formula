import 'reflect-metadata';
import Container from 'typedi';
import { Controller, hasObjectImplementedOnInit } from './controllers';

export class Kernel {
  constructor(private readonly controllers: Array<Controller>) {}

  run() {
    window.addEventListener('DOMContentLoaded', () => {
      Container.set(Window, window);

      this.controllers.forEach((controller) => {
        const instance = Container.get(controller);
        if (hasObjectImplementedOnInit(instance)) {
          instance.onInit();
        }
      });
    });
  }
}
