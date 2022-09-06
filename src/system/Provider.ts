type ClassProvider<T = any, C = unknown> = {
  token: T;
  useClass: C;
};

type ValueProvider<T = any, V = unknown> = {
  token: T;
  useValue: V;
};

export type Provider = ClassProvider | ValueProvider;
