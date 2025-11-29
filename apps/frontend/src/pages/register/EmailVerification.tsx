import { useState } from "react";
import { Input, Button, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";

interface EmailVerificationProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  onSendCode?: () => Promise<void>;
}

export default function EmailVerification({
  value,
  onChange,
  disabled,
  onSendCode,
}: EmailVerificationProps) {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      if (onSendCode) {
        await onSendCode();
      }
      // 开始倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("发送验证码失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input
        prefix={<MailOutlined />}
        placeholder="请输入邮箱验证码"
        variant="filled"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{ flex: 1 }}
      />
      <Button
        type="primary"
        onClick={handleSendCode}
        variant="filled"
        loading={loading}
        disabled={disabled || countdown > 0}
        style={{ width: 120 }}
      >
        {countdown > 0 ? `${countdown}s` : "发送验证码"}
      </Button>
    </Space.Compact>
  );
}
