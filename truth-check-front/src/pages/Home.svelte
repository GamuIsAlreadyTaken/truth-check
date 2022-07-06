
<div>
  <h2>Truth Check <br /> - <br /> The role play app</h2>
  <div id="controls">
    <a href="/playground"> Play </a>
    <a href="/marketplace"> Explore </a>
    <a href="/workshop"> Create </a>
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
  a {
    --height: 80px;
    --size: 20px;
    position: relative;
    width: 400px;
    border-radius: 3px;
    display: inline-block;
    height: var(--height);
    border: none;
    box-sizing: border-box;

    color: black;
    background-color: white;
    font-size: var(--size);
    font-family: inherit;
    text-decoration: none;
    text-align: center;
    padding: calc(var(--height) / 2 - var(--size) / 2);
  }
  a::after {
    content: '';
    display: block;
    width: calc(var(--size)*2);
    height: calc(var(--size)*2);
    position: absolute;
    right: var(--size);
    top: calc(var(--height) / 2 - var(--size));
    background-size: contain;
  }
  a[href="/playground"]::after {
    background-image: url(./src/assets/icons/dice.png);
  }
  a[href="/marketplace"]::after {
    background-image: url(./src/assets/icons/spyglass.png);
  }
  a[href="/workshop"]::after {
    background-image: url(./src/assets/icons/quill.png);
  }
</style>
