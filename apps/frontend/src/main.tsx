import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initRoutes } from "./utils/pagerouter/index.tsx";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Button, Result } from "antd";
import { useMount } from "ahooks";

const routes = initRoutes();
console.log(routes);
const router = createBrowserRouter(routes);

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  useMount(() => {
    console.error(error);
    // 上传错误
  });

  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，系统出现了一些问题，请稍后再试。"
      className="mt-20"
      extra={
        <div className="flex gap-4 justify-center">
          <Button type="primary" onClick={resetErrorBoundary}>
            刷新
          </Button>
          <Button
            type="primary"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            返回首页
          </Button>
        </div>
      }
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
