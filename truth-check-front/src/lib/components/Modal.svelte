<script lang="ts">
  import { toggle } from "../stores/toggle.store";
  const controls = toggle();
</script>

<div on:click="{controls.toggle}">
  <slot name="button" {controls}>
    <button on:click={controls.toggle}>Open modal</button>
  </slot>
</div>
<div class="modal" class:oppened={$controls}>
  <slot name="modal" {controls} />
</div>
<div class="cover" class:oppened={$controls} on:click={controls.toggle} />

<style>
  * {
    --z-index: 20;
    z-index: var(--z-index);
  }
  .cover {
    z-index: calc(var(--z-index) - 1);
  }
  .modal {
    display: none;
    background-color: var(--main-color);
    position: absolute;
    min-width: 400px;
    left: calc(var(--deviceWidth) * 50);
    transform: translateX(-50%);
    border-radius: 3px;
    padding: 10px;
  }
  .modal.oppened {
    display: block;
  }
  .cover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: calc(var(--deviceWidth) * 100);
    height: calc(var(--deviceHeight) * 100);
    background-color: var(--main-color);
    opacity: 0.5;
  }
  .cover.oppened {
    display: block;
  }
</style>
