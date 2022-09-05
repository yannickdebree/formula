import { ReplaySubject } from 'rxjs';

export class MenuService {
  public readonly positionChanged$ = new ReplaySubject<boolean>();

  setPosition(opened: boolean) {
    this.positionChanged$.next(opened);
  }
}
