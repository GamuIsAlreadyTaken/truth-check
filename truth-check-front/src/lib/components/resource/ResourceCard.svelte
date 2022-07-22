<script lang="ts">
  import View from "../View.svelte";

  export let resource;
</script>
<div>

  <View data={resource} />

</div>

<style>
  div{
    overflow-y: scroll;
    height: 80%;
  }
</style>
