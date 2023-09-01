<template>
  <form @submit="onSubmit">
    <a
      role="button"
      class="navbar-burger is-active"
      aria-label="menu"
      aria-expanded="false"
      @click="
        () => {
          menuState?.setPosition(false);
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
        <button
          class="delete is-medium"
          type="button"
          @click="removeFormula(index)"
        ></button>
      </div>
      <button class="button is-small" type="button" @click="createFormula">
        New formula
      </button>
    </div>
    <div class="_footer">
      <button class="button is-primary" type="submit">Draw</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Formula } from '../../domain';

import WriterVueState from './writer.vue.state';

export default {
  data() {
    return {
      formulas: new Array<Formula>(),
      menuState: undefined,
      createFormula: undefined,
      removeFormula: undefined,
      submit: undefined,
    } as WriterVueState;
  },
  methods: {
    onSubmit(event: SubmitEvent) {
      event.preventDefault();
      !!this.submit && this.submit();
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
