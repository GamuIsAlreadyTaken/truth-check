<script lang="ts">
  import ColapsableBlock from "./ColapsableBlock.svelte";
  export let data: Record<string, any>;
  export let images: string[] = [];

  let entries = Object.entries(data);
</script>

{#each entries as [key, value]}
  <ColapsableBlock label={key.startsWith("$") ? key.split("$").pop() : key}>
    <!-- Remove $ from start -->
    <svelte:fragment slot="content">
      {#if typeof value === "object"}
        <svelte:self data={value} />
      {:else if images.includes(key)}
        <img src={value} alt="" />
      {:else if key.startsWith("$")}
        <div class="CODE_EDITOR">
          {value}
        </div>
      {:else}
        {value}
      {/if}
    </svelte:fragment>
  </ColapsableBlock>
{/each}

<!-- 
  Make simple blocks not have the arrow
  Change ellipsis blocks to remove ellipsis instead of show duplicate
  Make images show directly and remove arrow

 -->
<style>
  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
  .CODE_EDITOR {
    background-color: #555;
  }
</style>
