<script lang="ts">
  import Header from "../lib/resources/Header.svelte";
  import ResourceCard from "../lib/resources/resource/ResourceCard.svelte";
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
