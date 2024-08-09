export default defineBackground({
  persistent: true,
  main() {
    console.log("!!!!!!!!!!!!!!!!");

    browser.runtime.onMessage.addListener(async (message) => {
      console.log("Background script recieved message:", message);
      const requestOptions = {
        method: "GET",
        headers: {
          // Cookie: document.cookie,
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
