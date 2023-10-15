import React, { useState } from "react";
import { Button, Image, Space, Table, Tabs } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal , { } from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_POST, GET_POSTS } from "../../../api/post";

const ListPost = () => {
  const {data: posts} = useQuery(GET_POSTS)
  

  const [removePost] = useMutation(DELETE_POST)
  
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      // sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Hình ảnh bài viết",
      dataIndex: "image",
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            className="rounded-3xl "
            width={100}
            height={100}
            src={record?.image}
          />
        </div>
      ),
    },
    {
      title: "Nội dung bài viết",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/admin/post/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          <Button
            onClick={() => remove(record?.key)}
            type="primary"
            style={{ backgroundColor: "#e23428" }}
          >
            <MdDeleteForever />
          </Button>
        </Space>
      ),
    },
  ];

  const data = posts?.posts?.map((item: any) => ({
    key: item?.id,
    id: item?.id,
    title: item?.title,
    content : item?.content,
    image : item?.image
  }));

  

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const remove = (id: any) => {
    try {
      swal({
        title: "Are you sure you want to delete?",
        text: "You cannot undo after deleting!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            // removeComment(id);
            removePost({ variables: { id: id }, refetchQueries: [{ query: GET_POSTS }] })
            swal("You have successfully deleted", {
              icon: "success",
            });
          }
        })
        .catch(() => {
          swal("Error", {
            icon: "error",
          });
        });
    } catch (error) {}
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-between ">
        <div className="mb-3">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row">
          <Button
            className="bg-teal-700	text-[#fff] hover:drop-shadow-2xl mb-2"
            type="default"
            icon={<AiOutlinePlus />}
          >
            <Link to={`/admin/post/add`}>Thêm bài viết mới</Link>
          </Button>
          <Button
            className="bg-red-400	text-[#fff] hover:drop-shadow-2xl mb-2 md:ml-4"
            type="default"
            icon={<MdOutlineDeleteOutline />}
          >
            <Link to={`/room/add`}>Thùng rác</Link>
          </Button>
        </div>
      </div>
      <Table
        scroll={{x : true}}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default ListPost;
