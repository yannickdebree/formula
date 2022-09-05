import { Inject, OnInit } from '../core';
import { MenuService, UnknowElementError } from '../other';

@Inject(MenuService, Window)
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

  constructor(menuService: MenuService, window: Window) {
    menuService.positionChanged$.subscribe((opened) => {
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
      throw new UnknowElementError();
    }
    this.writerDOMRoot = writerDOMRoot;
  }

  onInit() {
    this.navbarBurger.addEventListener('click', () => {
      this.mobileViewState.opened = !this.mobileViewState.opened;
    });
  }
}
