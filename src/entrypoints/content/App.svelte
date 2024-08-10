<script lang="ts">
  import TaskTable from "../../lib/TaskTable.svelte";
</script>

<main class="app">
  <TaskTable />
</main>

<style>
  .app {
    position: fixed;
    z-index: 100000;
    top: 0;
    right: 0;

    font-size: 15px;
    pointer-events: none;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
</style>
