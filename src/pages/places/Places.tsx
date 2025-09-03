import { Button, message, Space } from "antd";
import { useDeletePlace, useGetPlaces } from "../../api/places/placeAPI";
import type { Place } from "../../types/place.types";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";

const Places = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetPlaces();

  const { mutate: deleteUser } = useDeletePlace();

  const handleDelete = () => {
    if (deleteId) {
      deleteUser(deleteId, {
        onSuccess: () => {
          messageApi.success("Place deleted successfully");
          setOpenModal(false);
        },
        onError: (error) => {
          messageApi.error("Error deleted Place: " + error);
          console.error("Delete Place error:", error);
        },
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading places</div>;
  }
  return (
    <div className="p-4">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Places</h2>
        <Button
          type="primary"
          className="mb-4"
          onClick={() => navigate("add-place")}
        >
          Add Place
        </Button>
      </div>
      <div className="mb-4"></div>
      <table className="table-auto w-full border shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Available</th>
            <th className="p-2 border">Created at</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u: Place, index: number) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.location}</td>
              <td className="p-2 border">{u.description}</td>
              <td className="p-2 border">
                {u.is_available ? "Aviable" : "Not aviable"}
              </td>
              <td className="p-2 border">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
              <td className="p-2 border flex gap-2">
                <Button
                  type="primary"
                  onClick={() => navigate(`edit-place/${u._id}`)}
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
              Are you sure to delete this place?
            </p>
            <Space direction="horizontal" className="w-full justify-end">
              <Button type="primary" className="w-full" onClick={handleDelete}>
                Delete place
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

export default Places;
