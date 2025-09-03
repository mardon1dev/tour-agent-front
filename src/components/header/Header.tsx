import {
  ArrowLeftOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Space } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const pathSegments = pathname.split("/").filter(Boolean);

  const handleLogOut = () => {
    setOpenModal(false);
    navigate("/login");
  };

  return (
    <header className="w-full flex flex-col justify-between items-center py-2 top-0 sticky bg-white px-3 z-[999] gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <ArrowLeftOutlined
            className="cursor-pointer text-2xl sm:block hidden"
            onClick={() => navigate(-1)}
          />
          <div className="ml-2 sm:block hidden">
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to="/">
                      <HomeOutlined />
                    </Link>
                  ),
                  key: "home",
                },
                ...pathSegments.map((segment, index) => ({
                  title:
                    index === pathSegments.length - 1 ? (
                      <span className="capitalize">{segment}</span>
                    ) : (
                      <Link
                        className="capitalize"
                        to={`/${pathSegments.slice(0, index + 1).join("/")}`}
                      >
                        {segment}
                      </Link>
                    ),
                  key: segment,
                })),
              ]}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span
            tabIndex={0}
            role="button"
            aria-label="user-avatar"
            onClick={() => setOpenModal(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setOpenModal(true);
              }
            }}
            className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
          >
            <Avatar
              className="cursor-pointer"
              size={30}
              icon={<UserOutlined />}
              alt="user-avatar"
            />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:hidden">
        <ArrowLeftOutlined
          className="cursor-pointer text-2xl"
          onClick={() => navigate(-1)}
        />
        <div className="ml-2">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to="/">
                    <HomeOutlined />
                  </Link>
                ),
                key: "home",
              },
              ...pathSegments.map((segment, index) => ({
                title:
                  index === pathSegments.length - 1 ? (
                    <span className="capitalize text-sm">{segment}</span>
                  ) : (
                    <Link
                      className="capitalize text-sm"
                      to={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    >
                      {segment}
                    </Link>
                  ),
                key: segment,
              })),
            ]}
          />
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">User Menu</h2>
            <Space direction="vertical" className="w-full">
              <Button type="primary" className="w-full" onClick={handleLogOut}>
                Log Out
              </Button>
              <Button className="w-full" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Space>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
