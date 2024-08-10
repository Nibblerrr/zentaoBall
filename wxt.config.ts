import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  modules: ["@wxt-dev/module-svelte"],
  manifest: {
    name: "禅道悬浮球",
    version: "1.0.0",
    description: "快速获取禅道任务信息",
    permissions: ["storage", "cookies"],
    host_permissions: [
      "http://project.gsitcloud.com/*",
      "http://172.20.41.50:3000/*",
    ],
  },
  browser: "chromium",
  dev: {
    server: {
      port: 5000,
    },
  },
  vite: () => ({
    esbuild: {
      drop:
        process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
    },
  }),
});
