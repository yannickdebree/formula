import { first, map, ReplaySubject } from 'rxjs';
import { ContainerInstance, Service } from 'typedi';
import { ComponentOptionsBase, ComponentPublicInstance, createApp } from 'vue';
import { Encoder, OnInit, Router } from '../core';
import { Formula, UnknowElementError } from '../domain';
import { mergeObjects, MobileMenuService, QUERY_PARAMS_KEY } from '../utils';
import WriterVue from './Writer.vue';

type VueInstance = ComponentPublicInstance<
  {},
  {},
  {
    formulas: Array<Formula>;
    formulasVersionUpdated$: ReplaySubject<Array<Formula>>;
    mobileMenuService: MobileMenuService;
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
  private readonly writerDOMRoot: HTMLDivElement;
  private readonly vueInstance: VueInstance;

  constructor(container: ContainerInstance) {
    this.router = container.get(Router);
    this.encoder = container.get(Encoder);
    const mobileMenuService = container.get(MobileMenuService);
    const window = container.get(Window);

    const writerDOMRoot =
      window.document.querySelector<HTMLDivElement>('#writer-root');
    if (!writerDOMRoot) {
      throw new UnknowElementError();
    }
    this.writerDOMRoot = writerDOMRoot;

    this.vueInstance = createApp(WriterVue).mount(
      this.writerDOMRoot
    ) as VueInstance;
    this.vueInstance.mobileMenuService = mobileMenuService;
  }

  onInit() {
    this.vueInstance.formulasVersionUpdated$.subscribe((_formulas) => {
      const formulas = mergeObjects(
        _formulas.map((formula) => ({
          [formula.name]: formula.content,
        }))
      );
      this.router.navigate({
        [QUERY_PARAMS_KEY.FORMULAS]: this.encoder.encode(
          JSON.stringify(formulas)
        ),
      });
    });

    this.router.queryParams$
      .pipe(
        first(),
        map((queryParams) =>
          !!queryParams[QUERY_PARAMS_KEY.FORMULAS]
            ? JSON.parse(
                this.encoder.decode(queryParams[QUERY_PARAMS_KEY.FORMULAS])
              )
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
  }
}
