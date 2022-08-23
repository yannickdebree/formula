<template>
  <form @submit="onSubmit">
    <a
      role="button"
      class="navbar-burger is-active"
      aria-label="menu"
      aria-expanded="false"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
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
      <button
        class="delete is-medium"
        @click="removeFormula(index, formula)"
      ></button>
    </div>
    <button class="button is-small" type="button" @click="registerNewFormula">
      New function
    </button>
    <br />
    <button class="button is-primary" type="submit">Draw</button>
  </form>
</template>

<script lang="ts">
import { ReplaySubject } from 'rxjs';
import { Formula } from '../domain';
import { findNextFormulaName } from '../utils';

export default {
  data() {
    return {
      formulas: new Array<Formula>(),
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
      this.formulas.push(new Formula(findNextFormulaName(this.formulas), ''));
    },
    removeFormula(index: number, formula: Formula) {
      if (index === 0) {
        this.formulas[index] = new Formula(formula.name, '');
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
  padding: 1rem 2rem;

  .navbar-burger {
    z-index: 2;
    position: relative;
  }

  .field {
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
      padding: calc(0.75em - 1px);
      margin: 0;
      padding-left: 0.5rem;
      min-width: max-content;
      padding-right: 0;
    }
  }
}
</style>
