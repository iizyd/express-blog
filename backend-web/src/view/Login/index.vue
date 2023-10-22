<template>
	<div class="login-wrap">
		<div class="card">
			<div class="title">DEMO</div>

			<div class="main">
				<n-form
					ref="formRef"
					:model="form"
					:rules="rules"
					label-placement="left"
					label-width="auto"
				>
					<n-form-item path="username" label="用户名">
						<n-input
							v-model:value="form.username"
							@keydown.enter.prevent
							placeholder="用户名"
						/>
					</n-form-item>
					<n-form-item path="password" label="密码">
						<n-input
							v-model:value="form.password"
							type="password"
							placeholder="密码"
							@keydown.enter.prevent
						/>
					</n-form-item>
				</n-form>

				<div class="footer">
					<n-button type="success" @click="onSubmit">登录</n-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import apis from "@/apis/apis.js";
import http from "@/apis/axios.js";
import { TOKEN_NAME } from "@/constant";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  FormInst,
  useMessage,
} from "naive-ui";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const message = useMessage();
const router = useRouter();

const formRef = ref<FormInst | null>(null);
const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入用户名",
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入密码",
  },
};

const login = async () => {
  const res = await apis.Login({
    ...form,
  });

  if (res.code === 200) {
    message.success("登录成功");
    localStorage.setItem(TOKEN_NAME, res.data.token);
    await router.push("/");
    location.reload();
  } else {
    message.error("登录失败");
  }
};

const onSubmit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      login();
    }
  });
};
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 500px;
    box-shadow: 0px 2px 12px #0003;
    border-radius: 4px;
    padding: 35px 40px;

    .title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 30px;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
