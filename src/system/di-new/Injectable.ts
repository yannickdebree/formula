export function Injectable(): ClassDecorator {
  return function (target) {
    console.log(target);

    (target as any)._deps = [];
  };
}
