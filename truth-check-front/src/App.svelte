<script lang="ts">
  import Home from "./pages/Home.svelte";
  import Playground from "./pages/Playground.svelte";
  import Workshop from "./pages/Workshop.svelte";
  import Account from "./pages/Account.svelte";
  import Marketplace from "./pages/Marketplace.svelte";

  let selectedRoute = window.location.pathname.split("/")[1];
  const routes = {
    play: "playground",
    create: "workshop",
    explore: "marketplace",
    account: "account",
  };
</script>

{#if selectedRoute == routes.play}
  <Playground />
{:else if selectedRoute == routes.create}
  <Workshop />
{:else if selectedRoute == routes.explore}
  <Marketplace />
{:else if selectedRoute == routes.account}
  <Account />
{:else}
  <Home />
{/if}
