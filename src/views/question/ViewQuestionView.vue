<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" tab="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="限制条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item :label="'时间限制(MS)'">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item :label="'空间限制(KB)'">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item :label="'堆栈限制(KB)'">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''"> </MdViewer>
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    bordered
                    >{{ tag }}</a-tag
                  >
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <!-- <a-tab-pane key="comment" tab="评论"> </a-tab-pane>
          <a-tab-pane key="answer" tab="题解"> </a-tab-pane> -->
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="title" label="编程语言" style="min-width: 240px">
            <a-select
              v-model="form.language"
              :style="{ width: '120px' }"
              placeholder="请选择编程语言"
            >
              <a-option>cpp</a-option>
              <a-option>java</a-option>
              <a-option>python</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="changeCode"
        ></CodeEditor>
        <a-divider size="0"></a-divider>
        <a-button type="primary" style="min-width: 150px" @click="doSubmit"
          >提交代码</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO,
} from "../../../generated";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { Question } from "../../../generated/models/Question";
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

const form = ref<QuestionSubmitAddRequest>({
  language: "cpp",
  code: "",
});

const changeCode = (value: string) => {
  form.value.code = value;
};

const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败" + res.message);
  }
};

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败" + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>
<style>
#viewQuestionView {
  max-width: 1580px;
  margin: 0 auto;
}
#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
