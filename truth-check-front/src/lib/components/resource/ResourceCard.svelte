<script lang="ts">
  import type { Resource } from "../../types/resource.type";
  import CardView from "../CardView.svelte";
  import View from "../View.svelte";

  export let resource: Resource;

  let { data, ...resourceInfo } = resource;

  let hidden = false;

  // dos caras, la info general, tipo yugioh
  // y data, al darle al boton de info se cambia
</script>

<div class="base">
  <!-- face 1 -->
  <div class:hidden>
    <CardView data={resourceInfo} />
  </div>
  <!-- face 2 -->
  <div class:hidden={!hidden}>
    <View {data} />
  </div>

  <button on:click={() => (hidden = !hidden)}> i </button>
</div>

<!-- 

  find a way to pass styles to view to have a cusom face 1
  make the view:

    key
      value
    
  instead of 

  key: value
 -->
<style>
  .base {
    display: block;
    overflow-y: auto;
    width: 500px;
    height: 500px;
    background-color: #333;
    position: relative;
    padding: 30px 0;
  }
  .hidden {
    display: none;
  }
  button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
