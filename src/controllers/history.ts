import { Inject, OnInit, Router } from '../system';
import { APPLICATION_NAME } from '../utils';

@Inject(Router, Window)
export default class History implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly window: Window
  ) { }

  onInit() {
    this.router.url$.subscribe((url) => {
      this.window.history.pushState(
        null,
        APPLICATION_NAME,
        url.pathname + url.search
      );
    });
  }
}
