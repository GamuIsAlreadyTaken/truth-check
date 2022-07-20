<script lang="ts">
  import { pageControl } from "./pages";
  const control = pageControl();
</script>

<svelte:head>
  <title>TruthCheck - Home</title>
</svelte:head>

<div>
  <h2>Truth Check <br /> - <br /> The role play app</h2>
  <div id="controls">
    <button id="playground" on:click={control.hook("/playground")}>
      Play
    </button>
    <button id="marketplace" on:click={control.hook("/marketplace")}>
      Explore
    </button>
    <button id="workshop" on:click={control.hook("/workshop")}>
      Create
    </button>
  </div>
</div>

<style>
  h2 {
    color: white;
    font-size: 70px;
    text-align: center;
    margin: 2%;
  }
  div {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
    position: relative;
    top: calc(var(--deviceHeight) * 50);
    transform: translateY(-50%);
  }
  div > div {
    flex-direction: column;
    gap: 10px;
    margin: auto 0;
    top: auto;
    position: initial;
    transform: initial;
  }
  button {
    --height: 80px;
    --size: 20px;
    position: relative;
    width: 400px;
    border-radius: 3px;
    display: inline-block;
    height: var(--height);
    border: none;
    box-sizing: border-box;

    cursor: pointer;

    color: black;
    background-color: white;
    font-size: var(--size);
    font-family: inherit;
    text-decoration: none;
    text-align: center;
    padding: calc(var(--height) / 2 - var(--size) / 2);
  }
  button:hover {
    filter: brightness(0.8);
  }
  button:active {
    filter: invert();
  }
  button::after {
    content: "";
    display: block;
    width: calc(var(--size) * 2);
    height: calc(var(--size) * 2);
    position: absolute;
    right: var(--size);
    top: calc(var(--height) / 2 - var(--size));
    background-size: contain;
  }
  #playground::after {
    background-image: url(./src/assets/icons/dice.png);
  }
  #marketplace::after {
    background-image: url(./src/assets/icons/spyglass.png);
  }
  #workshop::after {
    background-image: url(./src/assets/icons/quill.png);
  }
</style>
