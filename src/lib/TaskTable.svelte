<script lang="ts">
  import { storage } from "wxt/storage"
  import { onMount } from "svelte"
  import { scale } from "svelte/transition"
  import { TaskStatus } from "@/const"
  import { test } from "@/mock"

  let isOpenLogin = false
  let login = false
  let tasks: any[] = []
  const getTask = async (url: string) => {
    if (testMode) return test
    const result = await browser.runtime.sendMessage({ url })
    console.log(result)

    if (result.includes("user-login")) {
      login = false
      if (!isOpenLogin) {
        isOpenLogin = true
        window.open(TaskStatus.LOGIN)
      }
      return []
    }
    login = true
    const list = parseTasks(result)

    return list
  }

  function parseTasks(htmlString: string) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, "text/html")
    const tbody = doc.querySelector("#mainContent tbody")
    const tasks: object[] = []
    if (tbody === null) return tasks
    tbody!.querySelectorAll("tr").forEach((tr) => {
      if (tr === null) return
      const task = {
        id: tr!.querySelector(".c-id div label + label")?.textContent?.trim(),
        priority: tr.querySelector(".c-pri .label-pri")?.textContent?.trim(),
        project: tr.querySelector(".c-project a")?.textContent?.trim(),
        name: tr.querySelector(".c-name a")?.textContent?.trim(),
        link:
          TaskStatus.ORIGIN +
          tr.querySelector(".c-name a")?.attributes.getNamedItem("href")?.value,
        createdBy: tr.querySelector(".c-user")?.textContent?.trim(),
        assignedTo: tr.querySelector(".c-assignedTo span")?.textContent?.trim(),
        finishedBy: tr.querySelectorAll(".c-user")[1]?.textContent?.trim(),
        estimate: tr.querySelector(".c-hours")?.textContent?.trim(),
        consumed: tr.querySelectorAll(".c-hours")[1]?.textContent?.trim(),
        left: tr.querySelectorAll(".c-hours")[2]?.textContent?.trim(),
        deadline: tr.querySelector(".c-date")?.textContent?.trim(),
        status: tr.querySelector(".c-status span")?.textContent?.trim(),
        actions: Array.from(tr.querySelectorAll(".c-actions a")).map((a) => {
          const href = a.attributes.getNamedItem("href")?.value
          const title = a.attributes.getNamedItem("title")?.value
          return { href: TaskStatus.ORIGIN + href, title }
        })
      }
      tasks.push(task)
    })

    return tasks
  }

  let isDragging = false
  let isClick = true
  let startX: number, startY: number
  let offsetX = 0,
    offsetY = 0

  function onMouseDown(event: MouseEvent) {
    console.log("down", event)
    isClick = true
    isDragging = true
    startX = event.clientX - offsetX
    startY = event.clientY - offsetY
    console.log(startX, startY)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  function onMouseMove(event: MouseEvent) {
    isClick = false
    console.log("move")
    if (isDragging) {
      offsetX = event.clientX - startX
      offsetY = event.clientY - startY
    }
  }

  function onMouseUp(event: Event) {
    console.log("up", isDragging)
    isDragging = false
    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", onMouseUp)
  }

  let show = false
  async function onCircleClick(event: Event) {
    console.log("click")
    console.log(isDragging)
    if (isClick) {
      if (!show) {
        const list = await getTask(TaskStatus.DOING)
        hasNewTask = false

        tasks = list
      }
      show = !show
    }
  }

  async function onRightClick(event: Event) {
    if (isClick) {
      if (!show) {
        const list = await getTask(TaskStatus.DONE)
        hasNewTask = false

        tasks = list
      }
      show = !show
    }
  }

  let hasNewTask = false
  const getDataAuto = async () => {
    const list = await getTask(TaskStatus.DOING)

    const oldTask = await getLocal("tasks")
    console.log("!!!!!", oldTask)

    if (
      oldTask == undefined ||
      (list.length && !arraysAreEqual(list, oldTask))
    ) {
      console.log(list, tasks)
      setLocal("tasks", list)
      tasks = list
      hasNewTask = true
    }
  }

  const setLocal = async (key: string, list: object[]) => {
    await storage.setItem<string>(`local:${key}`, JSON.stringify(list))
  }

  const getLocal = async (key: string) => {
    const list = (await storage.getItem<string>(`local:${key}`)) || "[]"
    return JSON.parse(list)
  }

  function arraysAreEqual(array1: any, array2: any) {
    // 将数组序列化为字符串
    const string1 = JSON.stringify(array1)
    const string2 = JSON.stringify(array2)

    // 直接比较字符串
    return string1 === string2
  }
  let testMode = false
  onMount(() => {
    const interval = setInterval(getDataAuto, 1000 * 20)
    let pressNum = 0
    window.onkeydown = (event: KeyboardEvent) => {
      if (event.key === "t") {
        pressNum++
        if (pressNum === 8) {
          alert("开启调试")
          tasks = test
          testMode = true
        }
      }
    }
  })
</script>

<div
  class="table-container draggable-table"
  role="button"
  tabindex="0"
  on:mousedown={onMouseDown}
  style="left: {offsetX}px; top: {offsetY}px;"
>
  <button
    class="circle"
    on:click={onCircleClick}
    on:contextmenu|preventDefault={onRightClick}
    title="左键为未完成，右键为已完成，扩展面板可提供反馈"
  >
    T
  </button>
  <div class="task-container">
    {#if show}
      <table in:scale={{ duration: 300 }} out:scale={{ duration: 300 }}>
        {#if tasks.length == 0}
          <div class="taskTip">{login ? "没有任务！" : "还没登录！"}</div>
        {:else}
          <thead>
            <tr>
              <!-- <th>项目</th> -->
              <th>任务名称</th>
              <th>创建者</th>
              <!-- <th>预计</th>
            <th>消耗</th>
            <th>剩余</th> -->
              <th>截止日期</th>
              <!-- <th>状态</th> -->
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            {#each tasks as task}
              <tr>
                <!-- <td>{task.project}</td> -->
                <td>
                  <a href={task.link} target="_blank">{task.name}</a>
                </td>
                <td>{task.createdBy}</td>
                <!-- <td>{task.estimate}</td>
                  <td>{task.consumed}</td> -->
                <!-- <td>{task.left}</td> -->
                <td>{task.deadline}</td>
                <!-- <td>{task.status}</td> -->
                <td>
                  {#each task.actions as action}
                    <a href={action.href} target="_blank">{action.title}&nbsp</a
                    >
                  {/each}
                </td>
              </tr>
            {/each}
          </tbody>
        {/if}
      </table>
    {:else if hasNewTask}
      <table>
        <div class="taskTip">有新任务！</div>
      </table>
    {/if}
  </div>
</div>

<style>
  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }

  button {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  .table-container {
    pointer-events: auto;
    width: fit-content;
    height: fit-content;
    margin: 20px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .circle {
    background-color: #2f3c61;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    overflow: hidden;
  }

  table {
    width: fit-content;
    border-collapse: collapse;
    margin-right: 30px;
    transform-origin: top right;
  }

  .task-container {
    max-height: 250px;
    overflow: auto; /* 使用auto而不是scroll，以便在不需要滚动时自动隐藏滚动条 */
    scrollbar-width: none; /* 对于Firefox */
  }

  .task-container::-webkit-scrollbar {
    display: none;
  }

  .taskTip {
    text-align: center;
    padding: 10px;
  }

  table,
  td,
  th {
    border: 1px solid #e6e6e6;
  }

  th,
  tbody td {
    text-align: left;
    padding: 8px;
  }

  thead > tr,
  thead th {
    background-color: #2f3c61;
    color: #ffffffea;
  }

  tbody > tr {
    background-color: snow;
    color: #1a1a1a;
  }

  tbody > tr:hover {
    background-color: #ebf0f8;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 10000;
  }

  .draggable-table {
    position: relative;
    cursor: grab;
  }
</style>
