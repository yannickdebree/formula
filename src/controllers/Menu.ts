import { ContainerInstance, Service } from 'typedi';
import { OnInit } from '../core';
import { UnknowElementError } from '../domain';
import { MenuService } from '../utils';

@Service()
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

  constructor(container: ContainerInstance) {
    const menuService = container.get(MenuService);
    menuService.positionChanged$.subscribe((opened) => {
      this.mobileViewState.opened = opened;
    });
    const window = container.get(Window);
    const navbarBurger = window.document.querySelector('.navbar-burger');
    if (!navbarBurger) {
      throw new UnknowElementError();
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
