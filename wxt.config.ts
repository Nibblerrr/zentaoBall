import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
  manifest: {
    permissions: ["storage", "webRequestBlocking"],
    host_permissions: ["http://project.gsitcloud.com/*"]
  },
  browser: "chromium",
  dev: {
    server: {
      port: 5000
    }
  }
})
