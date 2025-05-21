<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import zh_Hans from "bytemd/locales/zh_Hans.json"; // 中文语言包
import gfm from "@bytemd/plugin-gfm";
import math from "@bytemd/plugin-math-ssr";
import gemoji from "@bytemd/plugin-gemoji";
import mermaid from "@bytemd/plugin-mermaid";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import footnotes from "@bytemd/plugin-footnotes";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid_zhHans from "@bytemd/plugin-mermaid/locales/zh_Hans.json";
import math_zhHans from "@bytemd/plugin-math/locales/zh_Hans.json";
import gfm_zhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}

const plugins = [
  breaks(),
  frontmatter(),
  footnotes(),
  mediumZoom(),
  gfm({ locale: gfm_zhHans }),
  highlightSsr(),
  math({
    locale: math_zhHans,
    katexOptions: {
      output: "mathml",
    },
  }),
  mermaid({ locale: mermaid_zhHans }),
  gemoji(),
  // Add more plugins here
];

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style>
:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}
</style>
