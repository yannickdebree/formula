import 'reflect-metadata';
import { Controller, hasControllerImplementedOnInit } from './controllers';
import { Container } from './di';
import { ErrorHandler, KernelErrorHandler } from './errors';
import { Provider } from './Provider';
import { CUSTOM_ERROR_HANDLER } from './providers_tokens';

interface KernelOptions {
  controllers: Array<Controller>;
  providers?: Array<Provider>;
}

export class Kernel {
  constructor(private readonly options: KernelOptions) {}

  run() {
    window.addEventListener('DOMContentLoaded', () => {
      const container = new Container();

      const providers = [
        {
          token: Window,
          useValue: window,
        },
        {
          token: CUSTOM_ERROR_HANDLER,
          useClass: KernelErrorHandler,
        },
      ] as Array<Provider>;

      providers.forEach((provider) => {
        // if (!!provider.useValue) {
        // container.registerInstance(provider.token, provider.useValue);
        // } else if (!!provider.useClass) {
        //   container.registerInstance(provider.token, provider.useValue);
        // }
      });

      const errorHandler = container.get(CUSTOM_ERROR_HANDLER) as ErrorHandler;

      try {
        this.options.controllers.forEach((controller) => {
          const instance = container.get(controller);
          if (hasControllerImplementedOnInit(instance)) {
            instance.onInit();
          }
        });
      } catch (err) {
        errorHandler.handle(err);
      }
    });
  }
}
