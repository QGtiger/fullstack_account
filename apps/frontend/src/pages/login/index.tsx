import { Form, Input, Button, Checkbox, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreation, useRequest } from "ahooks";
import { request } from "@/api";
import { loginSuccess } from "../utils";

const LOGINPARAMS_KEY = "login_params";

interface LoginParams {
  username: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { runAsync: onFinishAsync, loading } = useRequest(
    async (values: LoginParams) => {
      const res = await request<LoginUserVo>({
        method: "POST",
        url: "/user/login",
        data: values,
      });
      const token = res.accessToken;

      loginSuccess(token);

      // 如果记住密码，保存到 localStorage
      if (values.remember) {
        localStorage.setItem(LOGINPARAMS_KEY, JSON.stringify(values));
      } else {
        localStorage.removeItem(LOGINPARAMS_KEY);
      }
    },
    {
      manual: true,
    }
  );

  const initialValues = useCreation(() => {
    const paramsString = localStorage.getItem(LOGINPARAMS_KEY);
    if (!paramsString) {
      return {
        remember: true,
      };
    }

    return JSON.parse(paramsString) as LoginParams;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form<LoginParams>
        name="login"
        initialValues={initialValues}
        style={{ width: 360 }}
        onFinish={onFinishAsync}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="username"
          className="mb-4!"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input
            prefix={<UserOutlined />}
            variant="filled"
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          className="mb-2!"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密码"
            variant="filled"
          />
        </Form.Item>
        <Form.Item className="mb-1!">
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <a
              onClick={() =>
                navigate({
                  pathname: "/register",
                  search: location.search,
                })
              }
            >
              立即注册
            </a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" loading={loading} htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
