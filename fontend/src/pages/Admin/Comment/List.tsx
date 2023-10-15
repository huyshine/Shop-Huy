import React, { useState } from "react";
import { Button, Image, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal , { } from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_COMMENT, GET_COMMENTS } from "../../../api/comment";

const ListComment = () => {
  const {data: comments} = useQuery(GET_COMMENTS)

  console.log(comments, "Comment");

  const [removeComment] = useMutation(DELETE_COMMENT)
  const data = comments?.comments?.map((item: any) => ({
    key: item?.id,
    id: item?.id,
    post: item?.post,
    user: item?.user,
    content: item?.content,
  }))
  
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      // sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Bài viết",
      dataIndex: "post",
      key: "post",
      render: (text:any) => (
        <div>{text.title}</div>
      )
    },
    {
      title: "Người gửi",
      dataIndex: "user",
      key: "user",
      render: (text:any) => (
        <div>{text.email}</div>
      )
    },
    {
      title: "Bình luận",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
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
            removeComment({ variables: { id: id }, refetchQueries: [{ query: GET_COMMENTS }] })
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

export default ListComment;
