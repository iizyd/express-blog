<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="200"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <div v-show="!collapsed" class="logo-box">DEMO</div>

    <n-menu
      v-model:value="activeKey"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import { MentionOption, NIcon, NMenu, NLayoutSider } from "naive-ui";
import { ref, h, Component, watch } from "vue";
import {
  BookmarkOutline,
  CaretDownOutline,
  BookOutline,
} from "@vicons/ionicons5";
import { RouterLink, useRoute } from "vue-router";

function renderIcon(icon: Component) {
  return () =>
    h(NIcon, null, { default: () => h(icon ? icon : CaretDownOutline) });
}

const menuOptions: MentionOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/article",
          },
        },
        { default: () => "文章管理" }
      ),
    key: "article",
    icon: renderIcon(BookOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/tag",
          },
        },
        { default: () => "标签管理" }
      ),
    key: "tag",
    icon: renderIcon(BookmarkOutline),
  },
];

const collapsed = ref(false);
const activeKey = ref("");

const route = useRoute();

const setMenuActive = () => {
  activeKey.value = (route.matched[1]?.name || "") as string;
};

watch(
  route,
  () => {
    setMenuActive();
  },
  { deep: true, immediate: true }
);
</script>

<style lang="less" scoped>
.logo-box {
  height: 48px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: bold;
}

.n-layout-sider {
  box-shadow: 2px 5px 10px #0000001f;
}
</style>
