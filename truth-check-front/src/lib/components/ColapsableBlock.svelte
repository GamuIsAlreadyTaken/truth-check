<script lang="ts">
  export let label: string;
  console.log("type of label:", typeof label, label);
  let oppened: boolean;
</script>

<label class:oppened>
  <input type="checkbox" bind:checked={oppened} />

  {#if isNaN(parseInt(label))}
    <p>{label}</p>
    <div class:oppened>
      <slot name="content" />
    </div>
  {:else}
    <p>{label}</p>

    <!-- Think of a way to avoid index labels while having 
      posibility to show resources 
      arrays should show directly the elements without indexes
      think of something to put when the content is not a simple string
      for example think of inventory, an array of resources
      
    -->
    <div class="content">
      <slot name="content" />
    </div>
  {/if}
</label>

<style>
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  input {
    display: none;
  }
  p {
    margin: 5px 80px 0 0;
    text-overflow: ellipsis;
  }
  label {
    background-color: var(--title-color);
    display: block;
    position: relative;
    margin: 0;
    --size: 15px;
    --icon-color: red;

    border: 1px solid white;
  }
  label::before {
    content: "";
    display: block;
    position: absolute;
    right: calc(var(--size) * 3);
    top: 50%;
    transform: translateY(-50%) rotateZ(45deg);
    background-color: var(--icon-color);
    transform-origin: center;
    transition: transform 150ms ease, top 150ms ease;
    width: var(--size);
    height: var(--size);
    border-radius: 0 0 0 0;
  }
  label.oppened::before {
    transform: translateY(-50%) rotateZ(45deg) scaleY(-1) scaleX(-1);
    top: var(--size);
  }

  div {
    display: flex;
    flex-direction: column;
    transition: translateY 200ms ease;
    transform-origin: top;
    transform: translateY(100%) scaleY(0);
    height: 0;
    margin: 0;
  }
  div.oppened {
    transform: translateY(0) scaleY(1);
    height: auto;
  }
</style>
