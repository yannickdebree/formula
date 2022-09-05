import { Inject, OnInit, Router } from '../core';
import { APPLICATION_NAME } from '../other';

@Inject(Router)
export class Title implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly window: Window
  ) {}

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
