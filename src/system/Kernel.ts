import 'reflect-metadata';
import { Controller, hasControllerImplementedOnInit } from './controllers';
import { Container } from './di';
import { ErrorHandler, KernelErrorHandler } from './errors';
import { isClassProvider, isValueProvider, Provider } from './Provider';
import { ERROR_HANDLER } from './providers_tokens';

interface KernelOptions {
  controllers: Array<Controller>;
  providers?: Array<Provider>;
}

export class Kernel {
  constructor(private readonly options: KernelOptions) {}

  run() {
    window.addEventListener('DOMContentLoaded', () => {
      const container = new Container();

      const providers = new Array<Provider>();
      providers.push(
        {
          token: Window,
          useValue: window,
        },
        {
          token: ERROR_HANDLER,
          useClass: KernelErrorHandler,
        }
      );

      this.options.providers?.forEach((provider) => {
        const index = providers.findIndex((p) => p.token === provider.token);
        if (index !== -1) {
          providers[index] = provider;
        }
      });

      providers.forEach((provider) => {
        if (isClassProvider(provider)) {
          container.registerTransient(
            provider.token,
            (provider as any).useClass
          );
        }
        if (isValueProvider(provider)) {
          container.registerInstance(
            provider.token,
            (provider as any).useValue
          );
        }
      });

      const errorHandler = container.get(ERROR_HANDLER) as ErrorHandler;

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
