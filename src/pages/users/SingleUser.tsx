import { useParams } from "react-router-dom";
import { Card, Descriptions, Tag } from "antd";
import { useGetUser } from "../../api/users/userAPI";

const SingleUser = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUser(id!);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No User found</div>;

  return (
    <div className="p-4">
      <Card title={`${user.name}`} variant={"borderless"}>
        <Descriptions column={1}>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Home Location">
            {user.home_location}
          </Descriptions.Item>
          <Descriptions.Item label="Budget">
            <Tag color={user.preferences?.budget === "high" ? "green" : "blue"}>
              {user.preferences?.budget}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Likes">
            {user.preferences?.likes?.length
              ? user.preferences.likes.map((like: string, idx: number) => (
                  <Tag key={idx}>{like}</Tag>
                ))
              : "—"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default SingleUser;
