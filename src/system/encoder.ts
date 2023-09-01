import Inject from './di/inject';

@Inject(Window)
export default class Encoder {
  constructor(private readonly window: Window) { }

  encode(data: string): string {
    return this.window.btoa(data);
  }

  decode(data: string): string {
    return this.window.atob(data);
  }
}
