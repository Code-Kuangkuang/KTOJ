<template>
  <div id="ExampleView">
    <MdEditor :value="mdValue" :handle-change="onMdChange"></MdEditor>
    <!-- <CodeEditor :value="codeValue" :handle-change="onCodeChange"></CodeEditor> -->
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const mdValue = ref();
const codeValue = ref();

const onMdChange = (val: string) => {
  mdValue.value = val;
  console.log(mdValue);
};
const onCodeChange = (val: string) => {
  codeValue.value = val;

  console.log(codeValue);
};
</script>

<style scoped>
#ExampleView {
}
</style>
