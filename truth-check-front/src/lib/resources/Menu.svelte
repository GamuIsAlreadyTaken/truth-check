<script lang="ts">
  import { toggle } from "../stores/toggle";
  let controls = toggle();
</script>

<div class="base">
  <div class="button" on:click={controls.toggle}>
    <slot name="button" {controls} />
  </div>
  <div class="menu" class:oppened={$controls}>
    <slot name="menu" />
  </div>
</div>

<style>
  * {
    z-index: 10;
  }
  .base {
    position: relative;
  }

  .menu{
    display: none;
    min-width: 300px;
    flex-direction: column;
    position: absolute;
    background-color: var(--main-color);
    top: 100%;
    right: 50%;
    padding: 10px;
    border-radius: 3px;
  }
  .menu.oppened {
    display: flex;
  }
</style>
