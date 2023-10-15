import React, { useState } from "react";
import { Button, Image, Space, Table, Tabs } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import FormSearch from "../../../component/formSearch";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../api/user";

const ListUser = () => {
  const { data: users } = useQuery(GET_USERS);

  const data = users?.users?.map((item: any) => ({
    ...item,
    key: item.id,
  }));

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      // sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "imageType",
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            className="rounded-3xl "
            width={80}
            // height={100}
            src={record?.avatar}
          />
        </div>
      ),
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/admin/user/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
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

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:justify-between ">
        <div className="mb-3">
          <FormSearch />
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default ListUser;
