<template>
  <n-modal
    v-model:show="show_modal"
    preset="dialog"
    :title="title"
    :mask-closable="false"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onOK"
    @close="onCancel"
    @negative-click="onCancel"
  >
    <template #default>
      <div class="main">
        <n-scrollbar style="max-height: 80vh">
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
            <n-form-item label="标题" path="title">
              <n-input v-model:value="form.title" placeholder="标题" />
            </n-form-item>

            <n-form-item label="描述" path="description">
              <n-input
                type="textarea"
                v-model:value="form.description"
                placeholder="描述"
              />
            </n-form-item>

            <n-form-item label="状态" path="published">
              <n-switch v-model:value="form.published" />
            </n-form-item>

            <n-form-item label="内容" path="content">
              <md-editor
                v-model="form.content"
                :toolbarsExclude="['save', 'github']"
                @on-upload-img="onUploadImg"
              />
            </n-form-item>

            <n-form-item label="封面图片">
              <n-upload
                action="http://127.0.0.1:9000"
                :default-file-list="fileList"
                list-type="image-card"
                :custom-request="customUpload"
                :max="1"
                accept="image/png, image/jpeg"
                @remove="onFileRemove"
              >
                上传文件
              </n-upload>
            </n-form-item>

            <n-form-item label="标签" path="tag">
              <n-select
                v-model:value="form.tags"
                multiple
                :options="tags"
                placeholder="选择标签"
                clearable
              />
            </n-form-item>
          </n-form>
        </n-scrollbar>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import apis from "@/apis/apis.js";
import { computed } from "@vue/reactivity";
import {
  NModal,
  NInput,
  NForm,
  NFormItem,
  NSwitch,
  NUpload,
  UploadFileInfo,
  useMessage,
  UploadCustomRequestOptions,
  FormInst,
  NScrollbar,
  NSelect,
} from "naive-ui";
import { reactive, ref, toRefs, watch } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const message = useMessage();
const props = withDefaults(
  defineProps<{
    show_modal: boolean;
    article_id: number;
    modal_type: "new" | "edit";
    tags: { label: string; value: number }[];
  }>(),
  {
    show_modal: false,
    article_id: 0,
    modal_type: "new",
    tags: () => [],
  }
);
const { show_modal, article_id, modal_type, tags } = toRefs(props);

const emit = defineEmits<{
  (e: "update:show_modal", val: boolean): void;
  (e: "refresh"): void;
}>();

const title = computed(() => {
  return modal_type.value === "new" ? "新建文章" : "编辑文章";
});

const form = reactive<{
  published?: boolean;
  title?: string;
  description?: string;
  cover_image_url?: string;
  content?: string;
  modified_at?: string;
  tags?: number[];
}>({
  title: "",
  description: "",
  published: false,
  cover_image_url: "",
  content: "",
  modified_at: "zz",
  tags: [],
});

const rules = {
  title: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入标题",
  },
  description: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入描述",
  },
};

const formRef = ref<FormInst | null>(null);

// 事件
const resetForm = () => {
  form.title = "";
  form.description = "";
  form.published = false;
  form.content = "";
  form.cover_image_url = "";
  form.modified_at = "zz";
  form.tags = [];

  fileList.value = [];
};

const onOK = async () => {
  formRef.value?.validate(async (errors) => {
    if (errors) {
      message.error("请填写完整");
      return false;
    } else {
      if (modal_type.value === "new") {
        if (await createArticle()) {
          message.success("添加成功");
          emit("update:show_modal", false);
          resetForm();
          emit("refresh");
        } else {
          message.error("添加失败");
        }
        return false;
      } else {
        if (await updateArticle()) {
          message.success("更新成功");
          emit("update:show_modal", false);
          resetForm();
          emit("refresh");
        } else {
          message.error("更新失败");
        }
      }
    }
  });

  return false;
};

const onCancel = () => {
  emit("update:show_modal", false);
  resetForm();
  return false;
};

// 上传相关
const fileList = ref<UploadFileInfo[]>([]);

// 文件列表变化的时候，更新表单字段
watch(
  fileList,
  (val) => {
    if (val.length > 0) {
      form.cover_image_url = fileList.value[0].url as string;
    } else {
      form.cover_image_url = "";
    }
  },
  { deep: true }
);

// 删除文件回调
const onFileRemove = () => {
  fileList.value = [];
};

// 自定义上传
const customUpload = async ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) => {
  const formData = new FormData();
  formData.append("file", file.file as File);
  // formData.append("type", "1");

  const res = await apis.uploadFile(formData);

  if (res.code === 200) {
    fileList.value = [
      {
        ...file,
        url: res.data.url,
      },
    ];

    message.success("上传成功");
    onFinish();
  } else {
    message.error(res.msg);
    onError();
  }
};

// 编辑模式
watch(show_modal, (val) => {
  if (val && modal_type.value === "edit") {
    getArticleInfo();
  }
});

const getArticleInfo = async () => {
  const res = await apis.getArticle(article_id.value);

  if (res.code === 200) {
    const data = res.data;
    form.content = data.content;
    form.title = data.title;
    form.description = data.description;
    form.published = data.published;
    form.cover_image_url = data.cover_image_url;
    form.modified_at = data.modified_by || "zz";

    if (data.tags && typeof data.tags[0] === "object") {
      form.tags = (data.tags as { id: number; name: string }[]).map(
        (item) => item.id
      );
    } else {
      form.tags = data.tags;
    }

    if (data.cover_image_url) {
      fileList.value[0] = {
        id: "default11",
        name: "封面图片",
        status: "finished",
        url: data.cover_image_url,
      };
    }
  }
};

// 修改文章
const updateArticle = async () => {
  const res = await apis.updateArticle(article_id.value, {
    ...form,
  });

  return Promise.resolve(res.code === 200);
};

// 创建文章
const createArticle = async () => {
  const res = await apis.createArticle({
    ...form,
  });

  return Promise.resolve(res.code === 200);
};

// 编辑器
const onUploadImg = async (files: File[], callback: any) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const formData = new FormData();
        formData.append("file", file);
        // formData.append("type", "1");

        apis
          .uploadFile(formData)
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item: any) => item.data.url));
};
</script>

<style lang="less" scoped>
.main {
  width: 80vw;
  height: 80vh;
  padding-top: 10px;
}
</style>
