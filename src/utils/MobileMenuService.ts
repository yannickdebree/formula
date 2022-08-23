import { ReplaySubject } from 'rxjs';
import { Service } from 'typedi';

@Service()
export class MobileMenuService {
  public readonly positionChanged$ = new ReplaySubject<boolean>();

  setPosition(opened: boolean) {
    this.positionChanged$.next(opened);
  }
}
