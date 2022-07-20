<script lang="ts">
  import { toggle } from "../stores/toggle.store";
  let controls = toggle();
</script>

<div class="button" on:click={controls.toggle}>
  <slot name="button" {controls} />
</div>
<div class="menu" class:oppened={$controls}>
  <slot name="menu" />
</div>

<style>
  * {
    z-index: 10;
  }
  .button {
    display: none;
  }
  @media (max-width: 700px) {
    .button {
      display: block;
    }
    .menu {
      display: none;
    }
    .menu.oppened {
      background-color: #444;
      display: block;
      width: calc(var(--deviceWidth) * 100);
      grid-column: 1 / 4;
      grid-row: 2 / 3;
    }
  }
</style>
