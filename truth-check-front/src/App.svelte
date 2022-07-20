<script lang="ts">
  import { pageControl } from "./pages/pages";

  const control = pageControl();
  const url = window.location.pathname;

  if (control.has(url)) control.go([url]);
  else control.go(["/home"]);

  $: {
    if (window.location.pathname != $control[0])
      window.location.pathname = $control[0];
    console.log(window.location.pathname);
  }
</script>

<svelte:component this={$control[1]} />
