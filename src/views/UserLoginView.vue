<template>
  <div class="userLoginView">
    <h2 style="margin-bottom: 16px; color: white">用户登录</h2>
    <a-form
      label-align="left"
      auto-label-width="true"
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入账号"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="secondary" html-type="submit" style="width: 80px"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { UserControllerService, UserLoginRequest } from "../../generated";
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    message.success("登录成功");
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>

<style scoped>
:deep(
    .arco-form-auto-label-width
      .arco-form-item-label-col
      > .arco-form-item-label
  ) {
  color: white;
}
#UserLoginView {
}
</style>
