import { Button, message, Space } from "antd";
import { useDeleteUser, useGetUsers } from "../../api/users/userAPI";
import type { User } from "../../types";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

const Users = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetUsers();

  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    if (deleteId) {
      deleteUser(deleteId, {
        onSuccess: () => {
          messageApi.success("User deleted successfully");
          setOpenModal(false);
        },
        onError: (error) => {
          messageApi.error("Error deleted user: " + error);
          console.error("Delete user error:", error);
        },
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="p-4">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <Button
          type="primary"
          className="mb-4"
          onClick={() => navigate("add-user")}
        >
          Add User
        </Button>
      </div>
      <table className="table-auto w-full border shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Home Location</th>
            <th className="p-2 border">Preferences</th>
            <th className="p-2 border">Budget</th>
            <th className="p-2 border">Joined</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u: User, index: number) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.phone}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.home_location}</td>
              <td className="p-2 border">{u.preferences?.likes?.join(", ")}</td>
              <td className="p-2 border">{u.preferences?.budget}</td>
              <td className="p-2 border">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
              <td className="p-2 border flex gap-2">
                <Button
                  type="primary"
                  onClick={() => navigate(`edit-user/${u._id}`)}
                >
                  <EditOutlined />
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    setDeleteId(u?._id);
                    setOpenModal(true);
                  }}
                >
                  <DeleteOutlined />
                </Button>
                <Button
                  type="primary"
                  color="green"
                  onClick={() => {
                    navigate(`${u?._id}`);
                  }}
                >
                  <MoreOutlined />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-100">
            <p className="text-xl font-bold mb-4">
              Are you sure to delete this user?
            </p>
            <Space direction="horizontal" className="w-full justify-end">
              <Button type="primary" className="w-full" onClick={handleDelete}>
                Delete user
              </Button>
              <Button className="w-full" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Space>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
