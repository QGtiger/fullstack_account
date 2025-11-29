import { Form, Input, Button, Flex, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useBoolean, useRequest } from "ahooks";
import EmailVerification from "./EmailVerification";
import { useEffect } from "react";
import { request } from "@/api";
import { loginSuccess } from "../utils";

interface RegisterParams {
  username: string;
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEmailValid, isEmailValidActions] = useBoolean(false);

  const emailValue = Form.useWatch("email", form);

  useEffect(() => {
    form
      .validateFields(["email"], {
        validateOnly: true,
      })
      .then(isEmailValidActions.setTrue, isEmailValidActions.setFalse);
  }, [emailValue, form, isEmailValidActions]);

  // 发送邮箱验证码
  const { runAsync: sendVerificationCode } = useRequest(
    async () => {
      return form.validateFields(["email"]).then(async (value) => {
        await request({
          url: "/email/code",
          params: {
            address: value.email,
          },
        });
        message.success("发送验证码成功");
      });
    },
    {
      manual: true,
    }
  );

  // 注册
  const { runAsync: onFinishAsync, loading } = useRequest(
    async (values: RegisterParams) => {
      const res = await request<LoginUserVo>({
        method: "POST",
        url: "/user/register",
        data: values,
      });
      loginSuccess(res.accessToken);
    },
    {
      manual: true,
    }
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Form<RegisterParams>
        name="register"
        style={{ width: 360 }}
        onFinish={onFinishAsync}
        form={form}
        layout="vertical"
        validateTrigger={["onBlur"]}
      >
        <Form.Item
          name="username"
          className="mb-4!"
          rules={[
            { required: true, message: "请输入用户名" },
            { min: 3, message: "用户名至少3个字符" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            variant="filled"
            placeholder="用户名"
          />
        </Form.Item>

        <Form.Item
          name="email"
          className="mb-4!"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入正确的邮箱格式" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            variant="filled"
            placeholder="邮箱"
          />
        </Form.Item>

        <Form.Item
          name="captcha"
          className="mb-4!"
          rules={[
            { required: true, message: "请输入邮箱验证码" },
            { len: 6, message: "验证码为6位数字" },
          ]}
        >
          <EmailVerification
            disabled={!isEmailValid}
            onSendCode={sendVerificationCode}
          />
        </Form.Item>

        <Form.Item
          name="password"
          className="mb-4!"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 6, message: "密码至少6个字符" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            variant="filled"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          className="mb-4!"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请确认密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            variant="filled"
            placeholder="确认密码"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            注册
          </Button>
        </Form.Item>

        <Form.Item className="mb-0!">
          <Flex justify="center">
            <a
              onClick={() =>
                navigate({
                  pathname: "/login",
                  search: location.search,
                })
              }
            >
              已有账号？立即登录
            </a>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
}
