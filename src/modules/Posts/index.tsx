// src/pages/PostPage.tsx
import React, { useState, useEffect } from "react";
import PostTable from "@/components/PostTable";
import FilterModal from "@/components/FilterModal";
import { Input, Button, Pagination } from "antd";
import { useQuery } from "@tanstack/react-query";
import postService from "@/services/posts.service";
import styles from "./PostPage.module.css";
import { PostResponse } from "@/types/posts/PostResponse";
import { Search } from "@/assets/icons/Search";
import { FilterButton } from "@/assets/icons/FilterButton";

const PostPage: React.FC = () => {
  const [searchId, setSearchId] = useState<number | undefined>(undefined);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [filters, setFilters] = useState<any>({});

  const { data: postsData = { posts: [], total: 0 }, isLoading } = useQuery<{
    posts: PostResponse[];
    total: number;
  }>({
    queryKey: ["posts", searchId, currentPage, filters],
    queryFn: () => postService.getPosts(searchId, currentPage, 10, filters),
  });

  const showFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleFilterSave = (newFilters: any) => {
    setFilters(newFilters);
    setIsFilterModalVisible(false);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterCancel = () => {
    setIsFilterModalVisible(false);
  };

  const handleSearch = (value: string) => {
    setSearchId(value ? parseInt(value, 10) : undefined);
    setCurrentPage(1); // Reset to first page on search
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (postsData) {
      setTotalPosts(postsData.total);
    }
  }, [postsData]);

  const totalPages = Math.ceil(totalPosts / 10);
  const showTotal = (total: number) => `${total} results`;

  return (
    <div className={styles.postManagementContainer}>
      <div className={styles.header}>
        <h1>Post Management</h1>
      </div>
      <div className={styles.searchAndFilter}>
        <Input.Search
          className={styles.searchInput} // Add a custom class
          type="number"
          placeholder="Search by ID"
          enterButton={<Button icon={<Search />} />}
          onSearch={handleSearch}
          style={{
            width: "400px",
            height: "45px", // Adjust height
            padding: "10px auto",
          }}
        />

        <Button
          onClick={showFilterModal}
          icon={<FilterButton />}
          className={styles.filterButton}
        >
          Filter
        </Button>
      </div>
      {isLoading ? (
        <div>Loading posts...</div>
      ) : (
        <PostTable
          searchText={searchId?.toString() || ""}
          currentPage={currentPage}
          setTotalPosts={setTotalPosts}
        />
      )}
      <FilterModal
        visible={isFilterModalVisible}
        onSave={handleFilterSave}
        onCancel={handleFilterCancel}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          current={currentPage}
          onChange={onPageChange}
          total={totalPosts}
          pageSize={10}
          showSizeChanger={false}
          showTotal={showTotal}
          style={{ width: "376px", height: "40px" }}
          itemRender={(_page, type, originalElement) => {
            if (type === "prev") {
              return (
                <a style={{ opacity: currentPage === 1 ? 0.5 : 1 }}>{"<"}</a>
              );
            }
            if (type === "next") {
              return (
                <a style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}>
                  {">"}
                </a>
              );
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  );
};

export default PostPage;
