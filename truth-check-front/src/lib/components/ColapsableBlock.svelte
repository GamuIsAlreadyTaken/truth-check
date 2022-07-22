<script lang="ts">
  let oppened;
</script>

<label class:oppened>
  <input type="checkbox" bind:checked={oppened} />
  <slot name="label" />
</label>
<div class:oppened>
  <slot name="content" />
</div>

<style>
  input {
    display: none;
  }
  label {
    background-color: #3f34;
    display: block;
    position: relative;
    padding: 5px;

    --size: 8px;
    --arm-length: calc(var(--size) * 2);
    --arm-width: var(--size);
  }
  label::after,
  label::before {
    content: "";
    display: block;
    position: absolute;
    right: calc(var(--size) * 3);
    top: calc(var(--size) * 3);
    transform: rotateZ(135deg);
    background-color: beige;
    transform-origin: top right;
    transition: transform 150ms ease, top 150ms ease;
  }
  label::after {
    width: var(--arm-length);
    height: var(--arm-width);
    /* right bottom hidden top */
    border-radius: 0 0 100% 0;
  }
  label::before {
    width: var(--arm-width);
    height: var(--arm-length);
    /* hidden bottom left top */
    border-radius: 100% 0 0 0;
  }
  label.oppened::after, 
  label.oppened::before{
    transform: rotateZ(135deg) scaleY(-1) scaleX(-1);
    top: var(--size)
  }
  div {
    display: flex;
    flex-direction: column;
    transition: translateY 200ms ease;
    transform-origin: top;
    transform: translateY(100%) scaleY(0);
    height: 0;
  }
  div.oppened {
    transform: translateY(0) scaleY(1);
    height: auto;
  }
</style>
