import { first, map, ReplaySubject } from 'rxjs';
import { ContainerInstance, Service } from 'typedi';
import { ComponentOptionsBase, ComponentPublicInstance, createApp } from 'vue';
import { Encoder, OnInit, Router } from '../core';
import { Formula, UnknowElementError } from '../domain';
import { mergeObjects } from '../utils';
import WriterVue from './Writer.vue';

type VueInstance = ComponentPublicInstance<
  {},
  {},
  {
    formulas: Array<Formula>;
    formulasVersionUpdated$: ReplaySubject<Array<Formula>>;
  },
  {},
  {},
  {},
  {},
  {},
  false,
  ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>
>;

@Service()
export class Writer implements OnInit {
  private readonly router: Router;
  private readonly encoder: Encoder;
  private readonly document: Document;
  // private readonly form: HTMLFormElement;
  // private readonly controllersContainer: HTMLDivElement;
  private readonly writerDOMRoot: HTMLDivElement;
  private readonly vueInstance: VueInstance;
  // private textareas = new Array<HTMLTextAreaElement>();
  // private mobileViewState = new Proxy(
  //   { opened: false, active: false },
  //   {
  //     set: (target, property, newValue) => {
  //       if (property === 'opened') {
  //         target[property] = newValue;
  //         if (!!newValue && !target.active) {
  //           target.active = true;
  //         }
  //         this.writerDOMRoot.style.transform = !!newValue
  //           ? 'translateY(0%)'
  //           : 'translateY(100%)';
  //         return true;
  //       }
  //       return false;
  //     },
  //   }
  // );

  constructor(container: ContainerInstance) {
    this.router = container.get(Router);
    this.encoder = container.get(Encoder);
    const window = container.get(Window);
    this.document = window.document;

    const writerDOMRoot =
      window.document.querySelector<HTMLDivElement>('#writer-root');
    if (!writerDOMRoot) {
      throw new UnknowElementError();
    }
    this.writerDOMRoot = writerDOMRoot;

    this.vueInstance = createApp(WriterVue).mount(
      this.writerDOMRoot
    ) as VueInstance;

    // const form = writerDOMRoot.querySelector('form');
    // if (!form) {
    //   throw new UnknowElementError();
    // }
    // this.form = form;

    // const controllersContainer = this.document.querySelector<HTMLDivElement>('.controllers');
    // if (!controllersContainer) {
    //   throw new UnknowElementError();
    // }
    // this.controllersContainer = controllersContainer;
  }

  onInit() {
    this.vueInstance.formulasVersionUpdated$.subscribe((_formulas) => {
      const formulas = mergeObjects(
        _formulas.map((formula) => ({
          [formula.name]: formula.content,
        }))
      );
      this.router.navigate({
        formulas: this.encoder.encode(JSON.stringify(formulas)),
      });
    });

    this.router.queryParams$
      .pipe(
        first(),
        map((queryParams) =>
          !!queryParams['formulas']
            ? JSON.parse(this.encoder.decode(queryParams['formulas']))
            : {}
        ),
        map((formulas) =>
          Object.keys(formulas).length > 0 ? formulas : { f: '' }
        )
      )
      .subscribe((formulas) => {
        this.vueInstance.formulas = Object.keys(formulas).map(
          (key) => new Formula(key, formulas[key])
        );
      });

    this.writerDOMRoot.addEventListener('keypress', (event) => {
      if (!event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        this.writerDOMRoot
          .querySelector('form')
          ?.dispatchEvent(new SubmitEvent('submit'));
      }
    });

    // this.form.addEventListener('submit', (event) => {
    //   event.preventDefault();
    //   if (this.mobileViewState.active) {
    //     this.mobileViewState.opened = false;
    //   }
    //   const queryParams = mergeObjects(
    //     this.textareas
    //       .sort((inputA, inputB) => inputA.name.localeCompare(inputB.name))
    //       .map((input) => ({ [input.name]: this.encoder.encode(input.value) }))
    //   );
    //   this.router.navigate(queryParams);
    // });

    // const navbarBurgers = this.document.querySelectorAll('.navbar-burger');
    // navbarBurgers.forEach((navcontrollersbarBurger) => {
    //   navbarBurger.addEventListener('click', () => {
    //     this.mobileViewState.opened = !this.mobileViewState.opened;
    //   });
    // });
  }
}
