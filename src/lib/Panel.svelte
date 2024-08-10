<script lang="ts">
  let content: string = ""

  const increment = async () => {
    const cookies = await browser.cookies.getAll({
      domain: "project.gsitcloud.com"
    })

    console.log(cookies)

    const name = cookies.find((cookie) => cookie.name === "za")?.value

    const result = await fetch("http://localhost:3000/message", {
      method: "post",
      body: JSON.stringify({ name: name || "未知用户", message: content }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(result)
  }
</script>

<div class="container">
  <textarea
    class="textarea"
    id="story"
    rows="5"
    cols="25"
    bind:value={content}
    placeholder="提交您的Bug反馈、建议或者想对我说的话"
  ></textarea>

  <button class="button" on:click={increment}> 发送 </button>
</div>

<style>
  .button {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #74796f; /* 按钮背景颜色与文本颜色一致 */
    color: white; /* 文字颜色为白色，确保对比度 */
    border: none; /* 移除边框 */
    margin: 10px; /* 外边距，根据需要调整 */
    padding: 5px 10px; /* 内边距，根据需要调整 */
    font-family: "Poppins", sans-serif; /* 与文本字体保持一致 */
    font-size: 0.9em; /* 字体大小，根据需要调整 */
    border-radius: 15px; /* 圆角效果 */
    cursor: pointer; /* 鼠标悬停时显示指针 */
    transition:
      background-color 300ms,
      transform 300ms; /* 过渡效果 */
  }

  .button:hover {
    background-color: #5a5f58; /* 鼠标悬停时的背景颜色 */
    transform: scale(1.05); /* 轻微放大 */
  }

  .textarea {
    background-color: #f0f0f0; /* 背景颜色，浅灰色 */
    color: #74796f; /* 文本颜色与页面其余部分一致 */
    border: 2px solid #74796f; /* 边框颜色与文本颜色一致 */
    padding: 10px; /* 内边距 */
    font-family: "Poppins", sans-serif; /* 字体 */
    font-size: 0.9em; /* 字体大小 */
    border-radius: 6px; /* 圆角效果 */
    box-sizing: border-box; /* 确保宽度包括内边距和边框 */
    transition: border-color 300ms; /* 过渡效果 */
    max-width: 250px;
    max-height: 170px;
    min-width: 120px;
    min-height: 100px;
  }

  .textarea:focus {
    border-color: #5a5f58; /* 聚焦时的边框颜色 */
    outline: none; /* 移除默认的聚焦轮廓 */
  }

  .container {
    position: relative;
  }
</style>
