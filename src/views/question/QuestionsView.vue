<template>
  <div id="questionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doQuery">查询</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            bordered
            >{{ tag }}</a-tag
          >
        </a-space>
      </template>
      <template #acceptRate="{ record }">
        {{
          `${record.submitNum ? record.acceptNum / record.submitNum : "0"}% (${
            record.acceptNum
          }/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toDetail(record)">详情</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { Question } from "../../../generated/models/Question";
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";

const router = useRouter();

const dataList = ref([]);

const total = ref(0);

const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  current: 1,
  pageSize: 10,
});

const doQuery = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
    console.log(dataList.value);
  } else {
    message.error("加载失败" + res.message);
  }
};

const toDetail = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];
/**
 * 监听searchParams变化，重新加载数据
 */
watchEffect(() => {
  loadData();
});
</script>
<style scoped>
#questionsView {
  max-width: 1580px;
  margin: 0 auto;
}
</style>
