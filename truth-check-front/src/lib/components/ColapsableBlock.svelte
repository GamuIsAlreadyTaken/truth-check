<script lang="ts">
  export let label: string;
  console.log("type of label:", typeof label, label);
  let oppened: boolean;

  const onlyContent = !isNaN(parseInt(label));
</script>

{#if onlyContent}
  <div>
    <slot name="content" />
  </div>
{:else}
  <label class:oppened>
    <input type="checkbox" bind:checked={oppened} style:display="none" />
    {#if !onlyContent}
      <p>{label}</p>
    {/if}
    <div class:oppened class="content">
      <slot name="content" />
    </div>
  </label>
{/if}

<style>
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
    --icon-color: #000;

    border: 1px solid white;
  }
  label::before {
    content: "";
    display: block;
    position: absolute;
    right: calc(var(--size) * 3);
    top: 50%;
    transform: translateY(-50%);

    width: var(--size);
    height: var(--size);

    background-color: var(--icon-color);
    clip-path: polygon(100% 20%, 0 20%, 50% 100%);
  }
  label.oppened::before {
    transform: translateY(-50%) scaleY(-1);
    top: var(--size);
  }
  .content {
    display: flex;
    flex-direction: column;
    transition: translate 200ms ease;
    transform-origin: top;
    transform: translateY(0) scaleY(0);
    height: 0;
    margin: 0;
  }
  .content.oppened {
    transform: scaleY(1);
    height: auto;
  }
</style>
