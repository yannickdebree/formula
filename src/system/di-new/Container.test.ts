import { Container } from './Container';
import { ProviderNotFoundError } from './errors';

class UnsavedClass {}

class SavedClass {}

let container: Container;

describe(Container.name, () => {
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
    container.set(SavedClass, new SavedClass());

    const instance = container.get(SavedClass);

    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(SavedClass);
  });

  it('Can save and get class instance', () => {
    container.set(SavedClass);

    const instance = container.get(SavedClass);

    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(SavedClass);
  });
});
