import { Container } from './Container';
import { ProviderNotFoundError } from './errors';
import { Injectable } from './Injectable';

class UnsavedClass {}

@Injectable()
class SavedClassA {}

@Injectable()
class SavedClassB {
  constructor(public readonly savedClassA: SavedClassA) {}
}

let container: Container;

describe(Injectable.name, () => {
  beforeEach(() => {
    container = new Container();
  });

  it('Cannot get unsaved class instance', () => {
    try {
      container.get(UnsavedClass);
    } catch (err) {
      expect(err).toBeInstanceOf(ProviderNotFoundError);
    }
  });

  it('Can save and get value by token', () => {
    const instance = container.get(SavedClassA);

    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(SavedClassA);
  });

  it('Can save and get class instance with dependencies', () => {
    const instance = container.get<SavedClassB>(SavedClassB);

    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(SavedClassB);
    expect(instance.savedClassA).toBeInstanceOf(SavedClassA);
  });
});
