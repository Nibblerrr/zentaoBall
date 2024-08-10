export default defineBackground({
  persistent: true,
  main() {
    console.log("!!!!!!!!!!!!!!!!")

    browser.runtime.onMessage.addListener(async (message) => {
      console.log("Background script recieved message:", message)

      const cookies = await browser.cookies.getAll({
        domain: "project.gsitcloud.com"
      })

      console.log(cookies)
      const requestOptions = {
        method: "GET",
        headers: {
          Cookie: cookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ")
        },
        body: message.body
      }
      const res = await fetch(message.url, {
        ...requestOptions
      })
      console.log(res)
      const result = await res.text()
      return result
    })
  }
})
