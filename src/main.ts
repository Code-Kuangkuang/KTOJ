import { createApp } from "vue";
import App from "./App.vue";
import "bytemd/dist/index.css";
import "github-markdown-css/github-markdown.css";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "./plugins/axios";
import "./access/index";
import "highlight.js/styles/atom-one-dark.css";

createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
