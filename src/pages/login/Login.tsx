import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // AntD passes all form values here
  const handleLogin = (values: { username: string; password: string }) => {
    // Example: check hardcoded values
    if (values.username === "admin" && values.password === "1234") {
      messageApi.success("Login successful!"); // ✅ user feedback
      navigate("/"); // ✅ redirect after success
    } else {
      messageApi.error("Invalid username or password"); // ⚡ quick feedback
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-80">
      {contextHolder}
      <h2 className="text-2xl mb-4 text-center">Login</h2>

      <Form
        layout="vertical"
        onFinish={handleLogin}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
