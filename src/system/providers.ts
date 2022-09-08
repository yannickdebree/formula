type ClassProvider<T = any, C = unknown> = {
  token: T;
  useClass: C;
};

export function isClassProvider(provider: Provider) {
  return provider.hasOwnProperty('useClass');
}

type ValueProvider<T = any, V = unknown> = {
  token: T;
  useValue: V;
};

export function isValueProvider(provider: Provider) {
  return provider.hasOwnProperty('useValue');
}

export type Provider = ClassProvider | ValueProvider;
