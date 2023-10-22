import { TOKEN_NAME } from "@/constant";
import router from "@/router";

const logout = () => {
  localStorage.removeItem(TOKEN_NAME);
  router.push("/login");
}

export default logout