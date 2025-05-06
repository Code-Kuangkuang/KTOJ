<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/oj-logo.png" class="logo" />
          <div class="title">Knowledge Tracing OnlineJudge</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content"><router-view /></a-layout-content>
      <a-layout-footer class="footer">online Judge</a-layout-footer>
    </a-layout>
  </div>
</template>

<script></script>

<style scoped>
#UserLayout {
  text-align: center;
  background: url("../assets/background.png") 0% 0% / cover no-repeat;
}

#UserLayout .logo {
  width: 64px;
  height: 64px;
}

#UserLayout .header {
  margin-top: 16px;
}

#UserLayout .title {
  color: white;
}

#UserLayout .content {
  margin-bottom: 16px;
  padding: 20px;
  margin-top: 50px;
}
#UserLayout .footer {
  color: white;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: centerz;
}
</style>
