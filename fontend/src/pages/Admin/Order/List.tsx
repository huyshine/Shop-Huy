import React, { useState } from "react";
import { Button, Carousel, Image, Space, Table, Tabs } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

import { MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT, GET_PRODUCTS } from "../../../api/products";
import { GET_ORDERS } from "../../../api/order";

const ListOrder = () => {
  const { data: orders } = useQuery(GET_ORDERS);

  console.log(orders, "Orders");

  const data = orders?.orderItems?.map((order: any) => ({
    ...order,
    key: order.id,
    id: order.id,
    userId: order?.order?.userId,
    product: order?.product,
    quantity: order?.quantity,
    status: order?.status,
    totalPrice: order?.product?.price * order?.quantity,
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
      title: "ID người mua",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (text) => <p>{text.name}</p>,
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "product",
      key: "product",
      sorter: (a, b) => a.price - b.price,
      render: (text) => <p>{text.price} VNĐ</p>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => {
        return <p>{totalPrice} VNĐ</p>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div>
          {status === "pending" ? (
            <button className="border rounded-xl p-2 bg-yellow-500 text-yellow-100">Đang chờ</button>
          ) : (
            <button className="border rounded-xl p-2 bg-green-500 text-yellow-100">Đã giao</button>
          )}
        </div>
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/admin/order/edit/${record?.key}`}>
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
        <div className="flex flex-col md:flex-row">
          <Button
            className="bg-teal-700	text-[#fff] hover:drop-shadow-2xl mb-2"
            type="default"
            icon={<AiOutlinePlus />}
          >
            <Link to={`/admin/product/add`}>Thêm sản phẩm mới</Link>
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
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default ListOrder;
