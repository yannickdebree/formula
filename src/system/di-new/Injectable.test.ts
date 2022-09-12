import 'reflect-metadata';

// import { Container } from './Container';
// import { ProviderNotFoundError } from './errors';
// import { Injectable } from './Injectable';

// class UnsavedClass {}

// @Injectable()
// class SavedClassA {}

// @Injectable()
// class SavedClassB {
//   constructor(public readonly savedClassA: SavedClassA) {}
// }

// let container: Container;

// describe(Injectable.name, () => {
//   beforeEach(() => {
//     container = new Container();
//   });

//   it('Cannot get unsaved class instance', () => {
//     try {
//       container.get(UnsavedClass);
//     } catch (err) {
//       expect(err).toBeInstanceOf(ProviderNotFoundError);
//     }
//   });

//   it('Can save and get value by token', () => {
//     const instance = container.get(SavedClassA);

//     expect(instance).toBeDefined();
//     expect(instance).toBeInstanceOf(SavedClassA);
//   });

//   it('Can save and get class instance with dependencies', () => {
//     const instance = container.get<SavedClassB>(SavedClassB);

//     expect(instance).toBeDefined();
//     expect(instance).toBeInstanceOf(SavedClassB);

//     expect(instance.savedClassA).toBeDefined();
//     expect(instance.savedClassA).toBeInstanceOf(SavedClassA);
//   });
// });

type GenericClassDecorator<T> = (target: T) => void;
interface Type<T> {
  new (...args: any[]): T;
}

const Service = (): GenericClassDecorator<Type<object>> => {
  return (target) => {
    console.log('test : ', Reflect.getMetadata('design:paramtypes', target));
  };
};

class Injector {
  // resolving instances
  resolve<T>(target: Type<any>): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    console.log('tokens : ', tokens);
    const injections = tokens.map((token: any) => this.resolve<any>(token));

    return new target(...injections);
  }
}

@Service()
class Foo {
  doFooStuff() {
    return 'foo';
  }
}

@Service()
class Bar {
  constructor(public foo: Foo) {}

  doBarStuff() {
    return 'bar';
  }
}

@Service()
class Foobar {
  constructor(public foo: Foo, public bar: Bar) {}
}

describe('DI', () => {
  it('test', () => {
    const foobar = new Injector().resolve<Foobar>(Foobar);
    expect(foobar.bar.doBarStuff()).toEqual('bar');
  });
});
