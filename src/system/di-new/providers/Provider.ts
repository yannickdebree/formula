export type ClassProvider<T, C> = {
  token: T;
  useClass: C;
};

export type ValueProvider<T, V> = {
  token: T;
  useValue: V;
};

export type Provider<T, D> = ClassProvider<T, D> | ValueProvider<T, D>;
