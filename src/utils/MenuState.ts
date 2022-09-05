import { ReplaySubject } from 'rxjs';

export class MenuState {
  public readonly positionChanged$ = new ReplaySubject<boolean>(1);

  setPosition(opened: boolean) {
    this.positionChanged$.next(opened);
  }
}
