import React, { useState, useCallback, useMemo } from "react";
import {
  Alert,
  Empty,
  message,
  Table,
  Avatar,
  Space,
  Checkbox,
  Dropdown,
  Menu,
  Popconfirm,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostResponse } from "@/types/posts/PostResponse";
import postService from "@/services/posts.service";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../styles/PostTable.css";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import UpdateInfo from "./Updateİnfo";

interface PostTableProps {
  searchText: string;
  currentPage: number;
  setTotalPosts: React.Dispatch<React.SetStateAction<number>>;
}

const PostTable: React.FC<PostTableProps> = ({
  searchText,
  currentPage,
  setTotalPosts,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState<PostResponse | null>(null);

  const fetchPosts = useCallback(async () => {
    const { posts, total } = await postService.getPosts(
      searchText ? parseInt(searchText, 10) : undefined,
      currentPage,
      10
    );
    setTotalPosts(total);
    return posts;
  }, [searchText, currentPage, setTotalPosts]);

  const {
    isError,
    error,
    data: posts = [],
  } = useQuery<PostResponse[], Error>({
    queryKey: ["posts", searchText, currentPage],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation<number, Error, number>({
    mutationFn: (id: number) => postService.deletePost(id).then(() => id), // Return the ID
    onSuccess: () => {
      messageApi.success("Post deleted successfully");
      setTimeout(() => messageApi.destroy(), 2000);
    },
    onError: (error: any) => {
      messageApi.error(
        `Error deleting post: ${error.message || "Something went wrong!"}`
      );
    },
  });

  // Similarly for updatePostMutation:
  const updatePostMutation = useMutation<
    number,
    Error,
    { id: number; updatedData: Partial<PostResponse> }
  >({
    mutationFn: ({ id, updatedData }) =>
      postService.updatePost(id, updatedData).then(() => id),
    onSuccess: () => {
      messageApi.success("Post updated successfully");
      setUpdateModalVisible(false);
      // Optionally, you might want to refetch posts here to update the table
    },
    onError: (error: any) => {
      messageApi.error(
        `Error updating post: ${error.message || "Something went wrong!"}`
      );
    },
  });

  const handleSelectAll = useCallback(
    (e: CheckboxChangeEvent) =>
      setSelectedRowKeys(e.target.checked ? posts.map((post) => post.id) : []),
    [posts]
  );

  const handleCheckboxChange = useCallback((e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    setSelectedRowKeys((prev) =>
      checked ? [...prev, value] : prev.filter((key) => key !== value)
    );
  }, []);

  const handleDelete = useCallback(
    (id: number) => deletePostMutation.mutate(id),
    [deletePostMutation]
  );

  const handleUpdate = useCallback(
    (id: number) => {
      const post = posts.find((p) => p.id === id);
      setPostToUpdate(post ?? null);
      setUpdateModalVisible(true);
    },
    [posts]
  );

  const handleModalClose = useCallback(() => {
    setUpdateModalVisible(false);
    setPostToUpdate(null);
  }, []);

  const handleSubmitUpdate = useCallback(
    (updatedData: Partial<PostResponse>) => {
      if (postToUpdate) {
        updatePostMutation.mutate({ id: postToUpdate.id, updatedData });
      }
    },
    [postToUpdate, updatePostMutation]
  );

  const columns = useMemo(
    () => [
      {
        title: (
          <Checkbox
            checked={selectedRowKeys.length === posts.length}
            indeterminate={
              selectedRowKeys.length > 0 &&
              selectedRowKeys.length < posts.length
            }
            onChange={handleSelectAll}
          />
        ),
        key: "checkbox",
        render: (_: any, record: PostResponse) => (
          <Checkbox
            checked={selectedRowKeys.includes(record.id)}
            onChange={handleCheckboxChange}
            value={record.id}
          />
        ),
      },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Agent",
        key: "agent",
        render: (_: any, record: PostResponse) => (
          <Space>
            <Avatar src={record.agentImage} size={40} />
            <span>{`${record.agentName} ${record.agentSurname}`}</span>
          </Space>
        ),
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
      },
      {
        title: "Residence Complex",
        key: "complex",
        render: (_: any, record: PostResponse) => (
          <span>{record.complex?.residentialComplex || "Not specified"}</span>
        ),
      },
      {
        title: "Post Date",
        dataIndex: "postDate",
        key: "postDate",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: PostResponse) => (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="1"
                  icon={<EditOutlined />}
                  onClick={() => handleUpdate(record.id)}
                >
                  Update
                </Menu.Item>
                <Menu.Item key="2" icon={<DeleteOutlined />} danger>
                  <Popconfirm
                    title="Delete this post?"
                    onConfirm={() => handleDelete(record.id)}
                  >
                    Delete
                  </Popconfirm>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <MoreOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          </Dropdown>
        ),
      },
    ],
    [
      posts,
      selectedRowKeys,
      handleSelectAll,
      handleCheckboxChange,
      handleUpdate,
      handleDelete,
    ]
  );

  return (
    <>
      {contextHolder}
      {isError && (
        <Alert
          message={`Error: ${error}`}
          type="warning"
          closable
          style={{ marginBottom: "20px" }}
        />
      )}
      {posts.length ? (
        <Table
          columns={columns}
          dataSource={posts}
          rowKey="id"
          rowClassName={(record) =>
            selectedRowKeys.includes(record.id) ? "selected-row" : ""
          }
          pagination={false}
          bordered={false}
          style={{ marginBottom: "20px" }}
        />
      ) : (
        <Empty description="No posts found" />
      )}
      <UpdateInfo
        isOpen={updateModalVisible}
        onClose={handleModalClose}
        onSubmit={handleSubmitUpdate}
        initialData={postToUpdate}
      />
    </>
  );
};

export default PostTable;
