import React, { useEffect } from "react";
import { Button, Form, Input, message, Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPlace,
  useAddPlace,
  useEditPlace,
} from "../../api/places/placeAPI";

const AddEditPlace: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { id } = useParams<{ id: string }>();

  // React Query hooks
  const { data: placeData } = useGetPlace(id || "");
  const addPlace = useAddPlace();
  const editPlace = useEditPlace();

  // Pre-fill form if editing
  useEffect(() => {
    if (id && placeData) {
      form.setFieldsValue(placeData);
    }
  }, [id, placeData, form]);

  const handleSubmit = (values: any) => {
    if (id) {
      // update
      editPlace.mutate(
        { id, place: values },
        {
          onSuccess: () => {
            messageApi.success("Place edited successfully");
            form.resetFields();
            navigate(-1);
          },
          onError: (error) => {
            messageApi.error("Error editing place: " + error);
            console.error("Edit place error:", error);
          },
        }
      );
    } else {
      // add
      addPlace.mutate(values, {
        onSuccess: () => {
          messageApi.success("Place added successfully");
          form.resetFields();
          navigate(-1);
        },
        onError: (error) => {
          messageApi.error("Error adding place: " + error);
          console.error("Add place error:", error);
        },
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-full max-w-lg mx-auto">
      {contextHolder}
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Place" : "Add Place"}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ is_available: true }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the place name!" }]}
        >
          <Input placeholder="Enter place name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input the location!" }]}
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item
          label="Is Available"
          name="is_available"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={() => navigate("/places")}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {id ? "Update Place" : "Add Place"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddEditPlace;
