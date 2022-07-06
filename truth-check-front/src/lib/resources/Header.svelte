<script>
  import { title } from "../util";
  import Hamburger from "./Hamburger.svelte";
  import CompactMenu from "./CompactMenu.svelte";
  import Menu from "./Menu.svelte";

  const pathname = window.location.pathname;
  const pages = ["/workshop", "/marketplace", "/playground"];
</script>

<nav>
  <a href="/home" class="logo">
    <img src="src/assets/truthcheck.png" alt="TruthCheck logo" />
  </a>
  <CompactMenu>
    <Hamburger slot="button" let:controls {controls} />
    <div class="links" slot="menu">
      {#each pages as page}
        <a href={page} class:current={page == pathname}>{title(page)}</a>
      {/each}
    </div>
  </CompactMenu>
  <a href="/account" class="profile">
    <img src="src/assets/icons/account.png" alt="Profile" />
  </a>
</nav>

<style>
  a {
    padding: 10px 5px;
  }
  .current {
    text-decoration: underline var(--accent-color) 2px;
    font-weight: bold;
  }

  nav {
    background-color: #444;
    display: grid;
    grid-template-columns: 120px 1fr 120px;
    grid-template-rows: 60px auto;
    height: 60px;
    align-items: center;
    position: relative;
  }
  a {
    text-decoration: none;
    color: white;
  }
  .logo img {
    width: 40px;
    margin: 0 40px;
    justify-self: center;
    cursor: pointer;
  }
  .logo:hover img {
    transform: rotateZ(-5deg);
  }
  .profile {
    display: flex;
    justify-content: end;
  }
  .profile img{
    width: 25px;
    margin: 0 40px;
  }

  @media (max-width: 700px) {
    nav {
      justify-items: center;
    }
    .links {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .links > * {
      border-top: 1px solid #fff2;
    }
    .logo {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
  }
</style>
