import { Button, Form, Input, message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAddUser, useEditUser, useGetUser } from "../../api/users/userAPI";
import type { User } from "../../types";

const { Option } = Select;

const AddEditUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // if you want edit mode (e.g., /users/edit/:id)
  const { mutate: addUser } = useAddUser();
  const { mutate: editUser } = useEditUser();
  const [messageApi, contextHolder] = message.useMessage();
  const { data: SingleUser } = id ? useGetUser(id) : {};

  // Example: fetch existing user if in edit mode
  useEffect(() => {
    if (id && SingleUser) {
      // TODO: replace with real API call
      const fakeUser = {
        name: SingleUser?.name,
        phone: SingleUser?.phone,
        email: SingleUser?.email,
        home_location: SingleUser?.home_location,
        preferences: SingleUser?.preferences,
      };
      form.setFieldsValue(fakeUser);
    }
  }, [id, form]);

  const handleSubmit = (values: User) => {
    if (id) {
      editUser(
        {
          id: id,
          user: values,
        },
        {
          onSuccess: () => {
            messageApi.success("User edited successfully");
            form.resetFields();
            navigate(-1);
          },
          onError: (error) => {
            messageApi.error("Error editing user: " + error);
            console.error("Edit user error:", error);
          },
        }
      );
    } else {
      // TODO: call add API
      addUser(values, {
        onSuccess: () => {
          messageApi.success("User added successfully");
          form.resetFields();
          navigate(-1); // redirect back to users list
        },
        onError: (error) => {
          messageApi.error("Error adding user: " + error);
          console.error("Add user error:", error);
        },
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-full max-w-lg mx-auto">
      {contextHolder}
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit User" : "Add User"}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ preferences: { likes: [], budget: "medium" } }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input the phone number!" },
          ]}
        >
          <Input placeholder="+123456789" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "Enter valid email!" },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>

        <Form.Item
          label="Home Location"
          name="home_location"
          rules={[
            { required: true, message: "Please input the home location!" },
          ]}
        >
          <Input placeholder="Enter home location" />
        </Form.Item>

        {/* Preferences */}
        <Form.Item label="Preferences - Likes" name={["preferences", "likes"]}>
          <Select mode="multiple" placeholder="Select likes">
            <Option value="beach">Beach</Option>
            <Option value="adventure">Adventure</Option>
            <Option value="culture">Culture</Option>
            <Option value="mountains">Mountains</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Preferences - Budget"
          name={["preferences", "budget"]}
          rules={[{ required: true, message: "Please select a budget!" }]}
        >
          <Select placeholder="Select budget">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={() => navigate("/users")}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {id ? "Update User" : "Add User"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddEditUser;
