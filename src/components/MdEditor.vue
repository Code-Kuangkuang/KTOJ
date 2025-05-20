<template>
  <Editor
    :locale="locale"
    :value="value"
    :mode="mode"
    :uploadImages="handleUpload"
    :plugins="plugins"
    @change="handleChange"
  />
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
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, defineProps, withDefaults } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode?: string;
  locale?: any;
  handleUpload?: (files: File[]) => Promise<any>;
  handleChange: (v: string) => void;
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
  mode: () => "auto",
  locale: () => zh_Hans,
  handleChange: (v: string) => {
    console.log(v);
  },
  handleUpload: async (files: File[]) => {
    // 模拟上传
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("https://your-upload-api.com/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        // 返回必须是 { url: 'https://...' }
        return {
          url: data.url, // 你的接口返回的图片地址
        };
      })
    );

    return uploaded;
  },
});
</script>

<style>
/**
隐藏github图标
 */
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
.bytemd {
  height: 500px;
}
:deep(.bytemd-fullscreen.bytemd) {
  z-index: 100;
}
</style>
