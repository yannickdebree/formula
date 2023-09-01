type ClassProvider<T = any, C = unknown> = {
  token: T;
  useClass: C;
};

export function isClassProvider(provider: Provider): boolean {
  return !!(provider as any)['useClass'];
}

type ValueProvider<T = any, V = unknown> = {
  token: T;
  useValue: V;
};

export function isValueProvider(provider: Provider): boolean {
  return !!(provider as any)['useValue'];
}

export type Provider = ClassProvider | ValueProvider;
