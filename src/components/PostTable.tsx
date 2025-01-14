// src/components/PostTable.tsx
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
  Button,
  Modal,
} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostResponse } from "@/types/posts/PostResponse";
import postService from "@/services/posts.service";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../styles/PostTable.css";

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
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentPostToUpdate, setCurrentPostToUpdate] =
    useState<PostResponse | null>(null);

  // Fetch posts from service
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
  } = useQuery<PostResponse[]>({
    queryKey: ["posts", searchText, currentPage],
    queryFn: fetchPosts,
  });

  // Mutation for deleting a post
  const deletePostMutation = useMutation({
    mutationFn: postService.deletePost,
    onSuccess: () => {
      messageApi.success("Post deleted successfully");
      setTimeout(messageApi.destroy, 2000);
    },
    onError: (error: any) => {
      messageApi.error(
        `Error deleting post: ${error.message || "Something went wrong!"}`
      );
    },
  });

  // Mutation for updating a post
  const updatePostMutation = useMutation({
    mutationFn: (data: { id: number; updatedData: Partial<PostResponse> }) =>
      postService.updatePost(data.id, data.updatedData),
    onSuccess: () => {
      messageApi.success("Post updated successfully");
      setTimeout(messageApi.destroy, 2000);
      setIsUpdateModalVisible(false); // Close modal after successful update
    },
    onError: (error: any) => {
      messageApi.error(
        `Error updating post: ${error.message || "Something went wrong!"}`
      );
    },
  });

  // Handlers
  const handleSelectAll = useCallback(
    (e: any) => {
      setSelectedRowKeys(e.target.checked ? posts.map((post) => post.id) : []);
    },
    [posts]
  );

  const handleCheckboxChange = useCallback((e: any) => {
    const { checked, value } = e.target;
    setSelectedRowKeys((prev) =>
      checked ? [...prev, value as number] : prev.filter((key) => key !== value)
    );
  }, []);

  const handleDelete = useCallback((id: number) => {
    deletePostMutation.mutate(id);
  }, []);

  const handleUpdate = useCallback(
    (id: number) => {
      const postToUpdate = posts.find((post) => post.id === id);
      if (postToUpdate) {
        setCurrentPostToUpdate(postToUpdate);
        setIsUpdateModalVisible(true);
      }
    },
    [posts]
  );

  const handleUpdateModalOk = useCallback(() => {
    if (currentPostToUpdate) {
      // Here you can gather the updated data from form fields in the modal
      const updatedData: Partial<PostResponse> = {
        // Example: company: 'New Company Name',
        // Update this with actual form data
      };
      updatePostMutation.mutate({ id: currentPostToUpdate.id, updatedData });
    }
  }, [currentPostToUpdate, updatePostMutation]);

  const handleUpdateModalCancel = useCallback(() => {
    setIsUpdateModalVisible(false);
    setCurrentPostToUpdate(null);
  }, []);

  // UI elements
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
            <Avatar src={record.agentImage || undefined} size={40} />
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
        dataIndex: "complex",
        key: "complex",
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
                    title="Are you sure to delete this post?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
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
          rowKey={(record) => record.id.toString()}
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
      <Modal
        title="Update Post"
        visible={isUpdateModalVisible}
        onOk={handleUpdateModalOk}
        onCancel={handleUpdateModalCancel}
        okText="Update"
        cancelText="Cancel"
      >
        {/* Here you would add form fields for updating post data */}
        <p>Update post form would go here.</p>
        {currentPostToUpdate && (
          <div>
            <p>Current Company: {currentPostToUpdate.company}</p>
            {/* Add more fields for other properties */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default PostTable;
