import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbar = [
    { name: "Home", link: "/" },
    { name: "Users", link: "/users" },
    { name: "Places", link: "/places" },
    { name: "Stays", link: "/stays" },
  ];

  return (
    <div className="flex flex-col items-center py-4  border-r border-gray-300  h-screen w-60">
      <div
        className="mb-4 text-2xl font-bold cursor-pointer"
      >
        <span>Tour agency</span>
      </div>
      <Menu
        theme="light"
        mode="vertical"
        className="w-full !border-none"
        selectedKeys={["/" + location.pathname.split("/")[1]]}
        items={navbar.map((item) => ({
          key: item.link,
          label: <Link to={item.link}>{item.name}</Link>,
        }))}
      />
    </div>
  );
};

export default Navbar;
