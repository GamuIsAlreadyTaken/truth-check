<script lang="ts">
  import Header from "../lib/components/Header.svelte";
  import ResourceCard from "../lib/components/resource/ResourceCard.svelte";

  //Mock
  async function getResource() {
    return (await fetch("/resource.example.json")).json();
  }
</script>

<svelte:head>
  <title>TruthCheck - Playground</title>
</svelte:head>

<Header />
<h2>Play</h2>

{#await getResource()}
  ...Loading
{:then data}
  <ResourceCard resource={data} />
{/await}

<style>
  h2 {
    color: red;
  }
</style>
