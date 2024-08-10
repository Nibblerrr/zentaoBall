<script lang="ts">
  import Panel from "../../lib/Panel.svelte"
</script>

<main>
  <div class="imgContainer">
    <a href="https://github.com/Nibblerrr" target="_blank" rel="noreferrer">
      <img src="/nibbler.png" class="logo" alt="my Logo" />
    </a>
    <div class="text">点击头像查看代码</div>
  </div>

  <div class="card">
    <Panel />
  </div>
</main>

<style>
  .imgContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .text {
    font-size: 0.8em;
    color: #74796f;
    font-family: "poppins", sans-serif;
    margin-bottom: 5px;
  }

  .logo {
    height: 6em;
    padding: 0.5em;
    will-change: filter;
    transition: filter 300ms;
    border-radius: 50%;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #74796fe3);
  }
</style>
