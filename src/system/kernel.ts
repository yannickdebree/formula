import 'reflect-metadata';
import { hasControllerImplementedOnInit } from './controllers/on-init';
import Container from './di/container';
import { ErrorHandler } from './errors/types';
import { isClassProvider, isValueProvider, Provider } from './providers';
import { ERROR_HANDLER_PROVIDER_TOKEN } from './providers.tokens';
import { Controller } from './controllers/types';
import KernelErrorHandler from './errors/kernel.error.handler';

interface KernelOptions {
  controllers: Array<Controller>;
  providers?: Array<Provider>;
}

export default class Kernel {
  constructor(private readonly options: KernelOptions) { }

  run(): void {
    window.addEventListener('DOMContentLoaded', () => {
      const container = new Container();

      const providers = [
        {
          token: Window,
          useValue: window,
        },
        {
          token: ERROR_HANDLER_PROVIDER_TOKEN,
          useClass: KernelErrorHandler,
        },
      ] as Array<Provider>;

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

      const errorHandler = container.get(ERROR_HANDLER_PROVIDER_TOKEN) as ErrorHandler;

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
