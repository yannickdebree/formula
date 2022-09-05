import { UnknowElementError } from '../domain';
import { Inject, OnInit } from '../system';
import { MenuState } from '../utils';

@Inject(MenuState, Window)
export class Menu implements OnInit {
  private readonly navbarBurger: Element;
  private readonly writerDOMRoot: HTMLDivElement;
  private mobileViewState = new Proxy(
    { opened: false, active: false },
    {
      set: (target, property, newValue) => {
        if (property === 'opened') {
          target[property] = newValue;
          if (!!newValue && !target.active) {
            target.active = true;
          }
          this.writerDOMRoot.style.transform = !!newValue
            ? 'translateY(0%)'
            : 'translateY(100%)';
          return true;
        }
        return false;
      },
    }
  );

  constructor(menuState: MenuState, window: Window) {
    menuState.positionChanged$.subscribe((opened) => {
      this.mobileViewState.opened = opened;
    });
    const selectors = '.navbar-burger';
    const navbarBurger = window.document.querySelector(selectors);
    if (!navbarBurger) {
      throw new UnknowElementError(selectors);
    }
    this.navbarBurger = navbarBurger;

    const writerDOMRoot =
      window.document.querySelector<HTMLDivElement>('#writer-root');
    if (!writerDOMRoot) {
      throw new UnknowElementError('test');
    }
    this.writerDOMRoot = writerDOMRoot;
  }

  onInit() {
    this.navbarBurger.addEventListener('click', () => {
      this.mobileViewState.opened = !this.mobileViewState.opened;
    });
  }
}
