import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Modal, Input, message, Form, Space } from "antd";
import { useGetPlace, useNotify } from "../../api/places/placeAPI";
import { useForm } from "antd/es/form/Form";

const SinglePlace = () => {
  const { id } = useParams(); // /places/:id
  const { data: place, isLoading } = useGetPlace(id!);

  const notify = useNotify();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [links, setLinks] = useState<string[]>([""]); // start with one empty link
  const [form] = useForm();

  const handleSendNotification = async () => {
    if (!notifMessage.trim()) {
      message.warning("Please enter a message");
      return;
    }

    // Compose the message with links:
    let finalMsg = notifMessage;
    links
      .filter((l) => l.trim())
      .forEach((l, i) => {
        finalMsg += `\nLink ${i + 1}: ${l}`;
      });

    try {
      await notify.mutateAsync(finalMsg);
      message.success("Notification sent!");
      setIsModalOpen(false);
      setNotifMessage("");
      setLinks([""]);
      form.resetFields();
    } catch (err: any) {
      message.error(err.message || "Error sending notification");
    }
  };

  const handleLinkChange = (value: string, index: number) => {
    const updated = [...links];
    updated[index] = value;
    setLinks(updated);
  };

  const addNewLink = () => setLinks([...links, ""]);

  if (isLoading) return <div>Loading...</div>;
  if (!place) return <div>No place found</div>;

  return (
    <div className="p-4">
      <Card
        title={place.name}
        extra={
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Send Notification
          </Button>
        }
      >
        <p>
          <strong>Location:</strong> {place.location}
        </p>
        <p>
          <strong>Description:</strong> {place.description}
        </p>
        <p>
          <strong>Available:</strong> {place.is_available ? "Yes" : "No"}
        </p>
      </Card>

      <Modal
        title="Send Notification"
        open={isModalOpen}
        footer={false}
        onCancel={() => {
          setIsModalOpen(false);
          setNotifMessage("");
          setLinks([""]);
        }}
      >
        <Form form={form} onFinish={handleSendNotification} layout="vertical">
          <Form.Item>
            <Input.TextArea
              rows={4}
              placeholder="Enter notification message"
              value={notifMessage}
              onChange={(e) => setNotifMessage(e.target.value)}
            />
          </Form.Item>

          {links.map((link, idx) => (
            <Form.Item key={idx} label={`Link ${idx + 1}`}>
              <Input
                placeholder="Enter link"
                value={link}
                onChange={(e) => handleLinkChange(e.target.value, idx)}
              />
            </Form.Item>
          ))}

          <Button type="dashed" onClick={addNewLink} style={{ width: "100%" }}>
            + Add another link
          </Button>

          <Space className="mt-4">
            <Button
              htmlType="button"
              onClick={() => {
                setIsModalOpen(false);
                setNotifMessage("");
                setLinks([""]);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={notify.isPending}>
              Send
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default SinglePlace;
