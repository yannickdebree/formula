import { first, map } from 'rxjs';
import { ComponentOptionsBase, ComponentPublicInstance, createApp } from 'vue';

import { mergeObjects } from '../../core';
import { findNextFormulaName, Formula } from '../../domain';
import {
  Encoder,
  Inject,
  OnInit,
  Router,
  UnknowDOMElementError,
} from '../../system';
import { MenuState, QUERY_PARAMS_KEY } from '../../utils';

import WriterVue from './writer.vue';
import WriterVueState from './writer.vue.state';

type VueInstance = ComponentPublicInstance<
  {},
  {},
  WriterVueState,
  {},
  {},
  {},
  {},
  {},
  false,
  ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>
>;

@Inject(Router, Encoder, MenuState, Window)
export default class Writer implements OnInit {
  private readonly writerDOMRoot: HTMLDivElement;
  private readonly vueInstance: VueInstance;

  constructor(
    private readonly router: Router,
    private readonly encoder: Encoder,
    menuState: MenuState,
    window: Window
  ) {
    const selectors = '#writer-root';
    const writerDOMRoot =
      window.document.querySelector<HTMLDivElement>(selectors);
    if (!writerDOMRoot) {
      throw new UnknowDOMElementError(selectors);
    }
    this.writerDOMRoot = writerDOMRoot;

    this.vueInstance = createApp(WriterVue).mount(
      this.writerDOMRoot
    ) as VueInstance;
    this.vueInstance.menuState = menuState;
    this.vueInstance.createFormula = () => {
      const formulas = [...this.vueInstance.formulas];
      this.vueInstance.formulas = this.vueInstance.formulas.concat([
        new Formula(
          findNextFormulaName(formulas.map((formula) => formula.name)),
          ''
        ),
      ]);
    };
    this.vueInstance.removeFormula = (index) => {
      const formulas = [...this.vueInstance.formulas];
      if (this.vueInstance.formulas.length === 1) {
        formulas[0] = { ...formulas[0], content: '' };
        this.vueInstance.formulas = formulas;
        return;
      }
      this.vueInstance.formulas = formulas.filter((_, i) => i !== index);
    };
    this.vueInstance.submit = () => {
      const formulas = mergeObjects(
        this.vueInstance.formulas.map((formula) => ({
          [formula.name]: formula.content,
        }))
      );
      this.router.navigate({
        [QUERY_PARAMS_KEY.FORMULAS]: this.encoder.encode(
          JSON.stringify(formulas)
        ),
      });
    };
  }

  onInit() {
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

    const selectors = 'form';
    const form = this.writerDOMRoot.querySelector(selectors);
    if (!form) {
      throw new UnknowDOMElementError(selectors);
    }

    this.writerDOMRoot.addEventListener('keypress', (event) => {
      if (!event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        form.dispatchEvent(new SubmitEvent('submit'));
      }
    });
  }
}
