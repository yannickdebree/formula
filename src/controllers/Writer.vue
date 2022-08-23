<template>
  <form>
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
    <div class="controllers"></div>
    <div>
      <button class="button is-small">New function</button>
    </div>
    <button class="button is-primary" type="submit">Draw</button>
  </form>
</template>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  height: 100%;
  padding: 0 2rem;

  .navbar-burger {
    z-index: 2;
    position: relative;
  }

  .controllers {
    .field {
      .field-label {
        padding: calc(0.75em - 1px);
        margin: 0;
        padding-left: 0;
        min-width: max-content;
        padding-right: 0.5rem;
      }

      textarea {
        resize: none;
        max-width: none;
        min-width: auto;
        width: 100%;

        width: 100%;
      }
    }
  }
}
</style>
