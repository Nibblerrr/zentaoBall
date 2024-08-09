// 1. Import the style
import App from "./App.svelte"

export default defineContentScript({
  matches: ["<all_urls>"],
  // 2. Set cssInjectionMode
  cssInjectionMode: "ui",

  async main(ctx) {
    browser.runtime.onMessage.addListener(async (message) => {
      console.log("Content script recieved message:", message)
      return Math.random()
    })
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: "example-ui",
      position: "inline",
      onMount: (container) => {
        // Create the Svelte app inside the UI container
        const app = new App({
          target: container
        })
        return app
      },
      onRemove: (app) => {
        // Destroy the app when the UI is removed
        app?.$destroy()
      }
    })

    // 4. Mount the UI
    ui.mount()
  }
})
