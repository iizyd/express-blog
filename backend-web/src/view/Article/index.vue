<template>
  <div class="article-wrap">
    <n-space vertical>
      <n-button type="primary" @click="onCreate">添 加</n-button>

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
        :style="{ height: 'calc(100vh - 85px - 34px)' }"
      />

      <Modal
        v-model:show_modal="show_modal"
        :article_id="article_id"
        :modal_type="modal_type"
        :tags="tag_list"
        @refresh="getData"
      />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import {
  NDataTable,
  NSpace,
  NButton,
  PaginationInfo,
  NImage,
  NTag,
  NPopconfirm,
  useMessage,
} from "naive-ui";
import { h, reactive, ref, VNode } from "vue";
import apis from "@/apis/apis";
import Modal from "./Modal.vue";

interface ArticleItem {
  id: number;
  title: string;
  desc: string;
  cover_image_url: string;
  content: string;
  modified_on: string;
  published: boolean;
  // tags: { id?: number; name?: string }[];
  tags: number[] | { id: number; name: string }[];
}

const message = useMessage();

const show_modal = ref<boolean>(false);
const modal_type = ref<"new" | "edit">("new");
const article_id = ref(0);

const onCreate = () => {
  modal_type.value = "new";
  article_id.value = 0;
  show_modal.value = true;
};

const onEdit = (row: ArticleItem) => {
  modal_type.value = "edit";
  article_id.value = row.id;
  show_modal.value = true;
};

const onDel = async (row: ArticleItem) => {
  const res = await apis.delArticle(row.id);

  if (res.code === 200) {
    message.success("删除成功");
    getData();
  } else {
    message.error("删除失败");
  }
};

const columns = ref([
  {
    title: "ID",
    key: "id",
    ellipsis: {
      tooltip: true,
    },
    width: 70,
  },
  {
    title: "标题",
    key: "title",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "描述",
    key: "description",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "封面",
    key: "cover_image_url",
    ellipsis: {
      tooltip: true,
    },
    render(row: ArticleItem): VNode {
      return h(
        NImage,
        {
          width: 40,
          src: row.cover_image_url,
          fallbackSrc: "",
        },
        {}
      );
    },
  },
  {
    title: "标签",
    key: "tags",
    ellipsis: {
      tooltip: false,
    },
    render(row: ArticleItem): VNode {
      return h("span", { class: "table-tag-wrap" }, [
        ...row.tags.map((tag_id) =>
          h(
            NTag,
            {
              type: "info",
              size: "small",
            },
            {
              default: () =>
                tag_list.value.find((tag) => tag.value === tag_id)?.label,
            }
          )
        ),
      ]);
    },
  },
  {
    title: "修改时间",
    key: "modified_at",
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: "状态",
    key: "published",
    width: 100,
    render(row: ArticleItem) {
      return h(
        NTag,
        {
          type: !row.published ? "warning" : "success",
          size: "medium",
        },
        { default: () => (!row.published ? "草稿" : "发布") }
      );
    },
  },
  {
    title: "操作",
    key: "opt",
    width: 100,
    render(row: ArticleItem) {
      return h("span", {}, [
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
      ]);
    },
  },
]);

const data = ref<ArticleItem[]>([]);

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  itemCount: 0,
  prefix({ itemCount }: PaginationInfo) {
    return `共 ${itemCount} 条`;
  },
});

const rowKey = (rowData: ArticleItem) => {
  return rowData.id;
};

const loading = ref(false);

const handlePageChange = (currentPage: number) => {
  pagination.page = currentPage;
  getData();
};

const getData = async () => {
  loading.value = true;
  const res = await apis.getArticles({
    page: pagination.page,
    page_size: pagination.pageSize,
  });

  if (res.code === 200) {
    data.value = res.data.data;

    data.value.forEach((article) => {
      if (typeof article.tags[0] === "object") {
        article.tags = (article.tags as { id: number; name: string }[]).map(
          (tag) => tag.id
        );
      }
    });
    pagination.itemCount = res.data.total;
  }

  loading.value = false;
};
getData();

// 标签下拉框
const tag_list = ref<{ value: number; label: string }[]>([]);
const getTagList = async () => {
  const res = await apis.getTags({
    page: 1,
    page_size: 9999,
  });

  if (res.code === 200) {
    tag_list.value =
      (res.data?.data as { id: number; name: string }[]).map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      }) || [];
  }
};
getTagList();
</script>

<style lang="less" scoped>
.article-wrap {
  height: 100%;

  :deep(.n-button + .n-button) {
    margin-left: 10px;
  }

  :deep(.table-tag-wrap) {
    display: flex;
    flex-wrap: wrap;

    .n-tag {
      margin-top: 3px;
      margin-left: 3px;
    }
  }
}
</style>
