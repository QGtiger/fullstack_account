import { setAccessToken } from "@/api/common";

const ACCESS_TOKEN_KEY = "access_token";

function setUrlParams(url: string, params: Record<string, string>) {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });
  return urlObj.toString();
}

export function loginSuccess(token: string) {
  const searchParams = new URLSearchParams(location.search);
  setAccessToken(token);

  // 获取 redirect 参数
  const redirect = decodeURIComponent(searchParams.get("redirect") || "/");
  try {
    // 修改为重定向回去
    location.replace(
      setUrlParams(redirect, {
        [ACCESS_TOKEN_KEY]: token,
      })
    );
  } catch (error) {
    // 相对路径
    console.error(error);
    location.href = "/";
  }
}
