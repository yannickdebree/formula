import { Provider } from './Provider';

function hasProviderToken(provider: Provider<unknown, unknown>) {
  return !!provider.token;
}

export function isClassProvider(provider: Provider<unknown, unknown>) {
  return hasProviderToken(provider) && !!(provider as any)['useClass'];
}

export function isValueProvider(provider: Provider<unknown, unknown>) {
  return hasProviderToken(provider) && !!(provider as any)['useValue'];
}
