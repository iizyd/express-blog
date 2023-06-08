<template>
  <div class="tag-page-wrap">
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-data-table
          remote
          bordered
          ref="table"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :row-key="rowKey"
          @update:page="handlePageChange"
          flex-height
          :style="{ height: 'calc(100vh - 70px)' }"
        />
      </n-gi>

      <n-gi>
        <n-card
          :title="isEdit ? '编辑标签' : '新建标签'"
          size="small"
          :segmented="{
            content: true,
            action: 'soft',
          }"
        >
          <template #header-extra>
            <n-button type="warning" size="small" @click="resetForm">
              重 置
            </n-button>
          </template>

          <n-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
            size="small"
            :inline="false"
          >
            <n-form-item label="标签名" path="name">
              <n-input v-model:value="form.name" placeholder="标签名" />
            </n-form-item>

            <n-form-item label="状态" path="state">
              <n-switch v-model:value="form.state">
                <template #checked> 开启 </template>
                <template #unchecked> 关闭 </template>
              </n-switch>
            </n-form-item>
          </n-form>

          <template #action>
            <n-space>
              <n-button
                v-show="isEdit"
                type="primary"
                size="small"
                @click="onUpdate"
              >
                更 新
              </n-button>

              <n-button
                v-show="!isEdit"
                type="info"
                size="small"
                @click="onCreate"
              >
                创 建
              </n-button>
            </n-space>
          </template>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import apis from "@/apis/apis.js";
import {
  NButton,
  NDataTable,
  NSwitch,
  NPopconfirm,
  PaginationInfo,
  NGrid,
  NGi,
  NCard,
  NSpace,
  FormInst,
  NForm,
  NFormItem,
  NInput,
  useMessage,
  NTag,
} from "naive-ui";
import { h, reactive, ref } from "vue";

interface TagItem {
  id: number;
  name: string;
  state: number;
}

const message = useMessage();

const loading = ref(false);

const columns = ref([
  {
    title: "ID",
    key: "id",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "标签名",
    key: "name",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "状态",
    key: "state",
    render(row: TagItem) {
      return h(
        NTag,
        {
          type: row.state === 0 ? "warning" : "success",
          size: "small",
        },
        { default: () => (row.state === 0 ? "关闭" : "开启") }
      );
    },
  },
  {
    title: "操作",
    key: "opt",
    render(row: TagItem) {
      return h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                text: true,
                type: "info",
                size: "medium",
                onClick: () => onEdit(row),
              },
              { default: () => "编辑" }
            ),
            h(
              NPopconfirm,
              {
                onPositiveClick: () => onDel(row),
                negativeText: "取消",
                positiveText: "确认",
              },
              {
                trigger: () =>
                  h(
                    NButton,
                    {
                      text: true,
                      type: "error",
                      size: "medium",
                    },
                    { default: () => "删除" }
                  ),
                default: () => "确认删除？",
              }
            ),
          ],
        }
      );
    },
  },
]);

const data = ref<TagItem[]>([]);

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  prefix({ itemCount }: PaginationInfo) {
    return `共 ${itemCount} 条`;
  },
});

const rowKey = (rowData: TagItem) => {
  return rowData.id;
};

const handlePageChange = (currentPage: number) => {
  pagination.page = currentPage;
  getData();
};

// 操作
const onEdit = (row: TagItem) => {
  isEdit.value = true;

  form.name = row.name;
  form.state = Boolean(row.state);

  current_tag_id.value = row.id;
};

const onDel = async (row: TagItem) => {
  const res = await apis.delTag(row.id);

  if (res.code === 200) {
    message.success("删除成功");
    getData();
  } else {
    message.error(res.msg);
  }
};

// 获取表格数据
const getData = async () => {
  loading.value = true;

  const res = await apis.getTags({
    page: pagination.page,
    page_size: pagination.pageSize,
  });

  if (res.code === 200) {
    data.value = res.data.list;
    pagination.itemCount = res.data.total;
  }

  loading.value = false;
};
getData();

// 表单
const form = reactive({
  name: "",
  state: false as number | boolean,
});
const formRef = ref<FormInst>();
const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入标签名",
  },
};
// 表单模式
const isEdit = ref<boolean>(false);
const current_tag_id = ref(0);

const valid = (): Promise<boolean> => {
  return new Promise((resolve) => {
    formRef.value?.validate((errs) => {
      resolve(errs ? false : true);
    });
  });
};

const resetForm = () => {
  form.name = "";
  form.state = 0;

  isEdit.value = false;

  current_tag_id.value = 0;
};

const onUpdate = async () => {
  if (!(await valid())) return;

  const res = await apis.updateTag(current_tag_id.value, {
    name: form.name,
    state: Number(form.state),
    modified_by: "zz",
  });

  if (res.code === 200) {
    message.success("更新成功");
    getData();
    resetForm();
  } else {
    message.error(res.msg);
  }
};

const onCreate = async () => {
  if (!(await valid())) return;

  const res = await apis.createTag({
    ...form,
    state: Number(form.state),
    created_by: "zz",
  });

  if (res.code === 200) {
    message.success("创建成功");
    resetForm();
    getData();
  } else {
    message.error(res.msg);
  }
};
</script>

<style lang="less" scoped>
.tag-page-wrap {
  height: calc(100vh - 70px);
}
</style>
