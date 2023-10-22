<template>
  <n-layout class="layout-wrap" has-sider>
    <SideBar />

    <n-layout>
      <n-layout-header>
        <Header />
      </n-layout-header>

      <n-layout-content :native-scrollbar="false">
        <router-view />
      </n-layout-content>

      <!-- <n-layout-footer>xigua-blog</n-layout-footer> -->
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { NLayout, NLayoutHeader, NLayoutContent } from "naive-ui";
import SideBar from "./SideBar.vue";
import Header from "./Header.vue";
</script>

<style lang="less" scoped>
.layout-wrap {
  width: 100%;
  height: 100%;
}

.n-layout-content {
  height: calc(100vh - 48px);

  :deep(& > div) {
    padding: 10px 10px 10px 15px;
  }
}
</style>
