import { ReplaySubject } from 'rxjs';

export default class MenuState {
  public readonly positionChanged$ = new ReplaySubject<boolean>(1);

  setPosition(opened: boolean): void {
    this.positionChanged$.next(opened);
  }
}
