import { ClassType, isClass } from '../../core';
import { isClassProvider } from '../Provider';
import { ProviderNotFoundError } from './errors';
import {
  ClassProvider,
  isValueProvider,
  Provider,
  ValueProvider,
} from './providers';

export class Container {
  private providers = new Array<Provider<any, any>>();

  get<T>(token: ClassType<T>): T;
  get<T = unknown>(token: any): T;
  get(token: any) {
    if (!!token._deps) {
      this.set(token);
    }

    const providersLength = this.providers.length;
    for (let i = 0; i < providersLength; ++i) {
      const provider = this.providers[i];
      if (provider.token === token) {
        if (isValueProvider(provider)) {
          return (provider as ValueProvider<any, any>).useValue;
        }
        if (isClassProvider(provider)) {
          return new (provider as ClassProvider<any, any>).useClass();
        }
      }
    }

    throw new ProviderNotFoundError();
  }

  set<T, V>(token: T, value?: V) {
    const _value = value || token;

    let newProvider: Provider<any, any> = {
      token,
      useValue: _value,
    };

    if (isClass(_value)) {
      newProvider = {
        token,
        useClass: _value,
      };
    }

    this.providers.push(newProvider);
  }
}
