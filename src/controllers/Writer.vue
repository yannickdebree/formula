<template>
  <form @submit="onSubmit">
    <a
      role="button"
      class="navbar-burger is-active"
      aria-label="menu"
      aria-expanded="false"
      @click="
        () => {
          menuService.setPosition(false);
        }
      "
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    <div class="container">
      <div
        v-for="(formula, index) of formulas"
        v-bind:key="formula.name"
        class="field is-horizontal"
      >
        <div class="field-label is-normal">
          <label class="label" v-bind:for="formula.name"
            >{{ formula.name }}(x) =</label
          >
        </div>
        <textarea
          class="textarea"
          v-bind="{
            name: formula.name,
            rows: formula.content.split('\n').length,
          }"
          v-model="formula.content"
          placeholder="Formula"
        ></textarea>
        <button class="delete is-medium" @click="removeFormula(index)"></button>
      </div>
      <button class="button is-small" type="button" @click="registerNewFormula">
        New formula
      </button>
    </div>
    <div class="_footer">
      <button class="button is-primary" type="submit">Draw</button>
    </div>
  </form>
</template>

<script lang="ts">
import { ReplaySubject } from 'rxjs';
import { Formula, findNextFormulaName, MenuService } from '../utils';

export default {
  data() {
    return {
      menuService: MenuService,
      formulas: new Array<{ name: string; content: string }>(),
      formulasVersionUpdated$: new ReplaySubject<Array<Formula>>(1),
    };
  },
  emits: ['formulas'],
  methods: {
    onSubmit(event: SubmitEvent) {
      event.preventDefault();
      this.formulasVersionUpdated$.next(this.formulas);
    },
    registerNewFormula() {
      try {
        this.formulas.push(
          new Formula(
            findNextFormulaName(this.formulas.map((formula) => formula.name)),
            ''
          )
        );
      } catch (err) {
        alert('Impossible operation');
      }
    },
    removeFormula(index: number) {
      if (index === 0) {
        this.formulas[index].content = '';
        return;
      }
      this.formulas.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  height: 100%;

  .navbar-burger {
    z-index: 2;
    position: relative !important;
  }

  .container {
    padding: 1rem 2rem;
    overflow-y: auto;
    width: 100%;

    .field {
      display: flex;

      .field-label {
        padding: calc(0.75em - 1px);
        margin: 0;
        padding-left: 0;
        min-width: max-content;
        padding-right: 0.5rem;
      }

      .textarea {
        resize: none;
        max-width: none;
        min-width: auto;
        width: 100%;
      }

      .delete {
        margin: 0;
        margin-top: 12px;
        margin-left: 6px;
      }
    }
  }

  ._footer {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
  }
}
</style>
