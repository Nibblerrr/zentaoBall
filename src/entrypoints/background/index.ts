export default defineBackground({
  persistent: true,
  main() {
    console.log("!!!!!!!!!!!!!!!!");

    browser.runtime.onMessage.addListener(async (message) => {
      console.log("Background script recieved message:", message);

      const cookies = await browser.cookies.getAll({
        url: "http://project.gsitcloud.com/",
      });
      const requestOptions = {
        method: "GET",
        headers: {
          Cookie: cookies.join("; "),
        },
      };
      const res = await fetch(message.url, {
        ...requestOptions,
      });
      const result = await res.text();
      return result;
    });
  },
});
