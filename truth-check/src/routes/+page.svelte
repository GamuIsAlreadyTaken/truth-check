<script lang="ts">
  export let data: import('./$types').PageServerLoad;
</script>

<h1>Truth Check</h1>
<p>{JSON.stringify(data)}</p>
