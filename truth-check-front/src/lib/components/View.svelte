<script lang="ts">
  import ColapsableBlock from "./ColapsableBlock.svelte";

  export let data;

  let entries = Object.entries(data);

  const MAX_LENGTH = 40;
</script>

<div>
  {#each entries as [key, value]}
    {#if typeof value == "object"}
      <ColapsableBlock>
        <svelte:fragment slot="label">{key}:</svelte:fragment>
        <svelte:self data={value} slot="content" />
      </ColapsableBlock>
    {:else if typeof value == "string" && value.length > MAX_LENGTH}
      <ColapsableBlock>
        <svelte:fragment slot="label">{key}:</svelte:fragment>
        <svelte:fragment slot="content">{value}</svelte:fragment>
      </ColapsableBlock>
    {:else}
      <p>
        {key}: {value}
      </p>
    {/if}
  {/each}
</div>

<style>
  div {
    margin: 0 20px;
  }
  p {
    margin: 5px 0;
    border: 1px solid #555;
  }
</style>
