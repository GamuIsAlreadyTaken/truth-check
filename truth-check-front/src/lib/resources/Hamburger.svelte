<script lang="ts">
  import type { Toggle } from "../stores/toggle";
  export let controls: Toggle;
</script>

<label>
  <input
    type="checkbox"
    checked={$controls}
  />
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <!-- Find a better way to target the label in css while
       maintaining the click redirection -->
  <label class="icon" />
</label>

<style>
  input {
    display: none;
  }

  .icon,
  .icon::after,
  .icon::before {
    --height: 4px;
    content: "";
    display: block;
    box-sizing: initial;
    width: calc(var(--height) * 6);
    height: var(--height);
    background-color: white;
    position: relative;
    transform-origin: center;
    transition: transform ease 300ms;
  }
  .icon {
    margin: -25px -15px;
    padding: 25px 15px;
    background-clip: content-box;
  }
  .icon::after {
    top: calc(var(--height) * -3);
    border-radius: var(--height) var(--height) 0 0;
  }
  .icon::before {
    top: calc(var(--height) * 2);
    border-radius: 0 0 var(--height) var(--height);
  }

  input:checked ~ .icon,
  input:checked ~ .icon::after,
  input:checked ~ .icon::before {
    background-color: red;
    transform: rotateZ(90deg);
    border-radius: 0;
  }
  input:checked ~ .icon {
    transform: rotate(45deg);
  }
  input:checked ~ .icon::after {
    top: calc(var(--height) * -1);
  }
  input:checked ~ .icon::before {
    top: 0;
  }
</style>
