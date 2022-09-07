import { Inject } from './di';

@Inject(Window)
export class Encoder {
  constructor(private readonly window: Window) {}

  encode(data: string) {
    return this.window.btoa(data);
  }

  decode(data: string) {
    return this.window.atob(data);
  }
}
