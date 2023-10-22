<template>
  <div class="header-wrap">
    <n-avatar
      size="medium"
      src="https://picx.zhimg.com/80/v2-9c5b94a0fd324ed303373c0c7e3b208d_1440w.jpg?source=1940ef5c"
    />

    <n-button dashed type="info" size="small" @click="logout">退出</n-button>
  </div>
</template>

<script lang="ts" setup>
import { NAvatar, NButton } from "naive-ui";
import utils from "@/utils/index";

const logout = () => {
  utils.logout();
};
</script>

<style lang="less" scoped>
.header-wrap {
  height: 48px;
  border-bottom: 1px solid rgb(224, 224, 230);
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: flex-end;
  box-shadow: 0px 1px 5px 2px #0000001f;
  position: relative;
  z-index: 1;

  .n-button {
    margin-left: 12px;
  }
}
</style>
