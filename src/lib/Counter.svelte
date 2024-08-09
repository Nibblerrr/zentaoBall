<script lang="ts">
  let count: number = 0
  const increment = async () => {
    count += 1
    await browser.runtime.sendMessage({ hello: "world" })
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
