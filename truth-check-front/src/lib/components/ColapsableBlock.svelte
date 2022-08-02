<script lang="ts">
  export let label: string;
  console.log("type of label:", typeof label, label);
  let oppened: boolean = true;

  const onlyContent = !isNaN(parseInt(label));
</script>

{#if onlyContent}
  <slot name="content" />
{:else}
  <label class:oppened>
    <input type="checkbox" bind:checked={oppened} style:display="none" />
    {#if !onlyContent}
      <p>{label}</p>
    {/if}
    <div class:oppened>
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
    --icon-color: red;

    border: 1px solid white;
    padding: 0 100px 0 0;
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
    /* display: flex;
    flex-direction: column; */
    transition: translate 200ms ease;
    transform-origin: top;
    transform: translateY(100%);
    height: 0;
    margin: 0;
  }
  div.oppened {
    transform: translateY(0);
    height: auto;
  }
  /* .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: auto;
  } */
</style>
