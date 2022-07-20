<script lang="ts">
  import Header from "../lib/components/Header.svelte";
  import ResourceCard from "../lib/components/resource/ResourceCard.svelte";
</script>

<svelte:head>
  <title>TruthCheck - Playground</title>
</svelte:head>

<Header />
<h2>Play</h2>

<ResourceCard/>


<style>
  h2 {
    color: red;
  }
</style>
