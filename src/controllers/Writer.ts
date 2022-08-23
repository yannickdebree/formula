import { first, map, ReplaySubject } from 'rxjs';
import { ContainerInstance, Service } from 'typedi';
import { ComponentOptionsBase, ComponentPublicInstance, createApp } from 'vue';
import { Encoder, OnInit, Router } from '../core';
import { Formula, UnknowElementError } from '../domain';
import {
  FORBIDDEN_FUNCTIONS_NAMES,
  mergeObjects,
  QueryParamsAnalyzer,
} from '../utils';
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
  private readonly queryParamsAnalyzer: QueryParamsAnalyzer;
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
    this.queryParamsAnalyzer = container.get(QueryParamsAnalyzer);
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
    this.vueInstance.formulasVersionUpdated$.subscribe((formulas) => {
      const queryParams = mergeObjects(
        formulas
          .sort((formulaA, formulaB) =>
            formulaA.name.localeCompare(formulaB.name)
          )
          .map((formula) => ({
            [formula.name]: this.encoder.encode(formula.content),
          }))
      );
      this.router.navigate(queryParams);
    });

    this.router.queryParams$
      .pipe(
        first(),
        map((queryParams) =>
          this.queryParamsAnalyzer.getFiltredQueryParams(
            queryParams,
            (key) => !FORBIDDEN_FUNCTIONS_NAMES.includes(key)
          )
        ),
        map((queryParams) =>
          Object.keys(queryParams).length > 0 ? queryParams : { f: '' }
        )
      )
      .subscribe((queryParams) => {
        console.log(queryParams);

        const formulas = Object.keys(queryParams).map(
          (key) => new Formula(key, queryParams[key])
        );
        this.vueInstance.formulas = formulas;
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
