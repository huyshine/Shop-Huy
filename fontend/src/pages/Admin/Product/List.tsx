import React, { useState } from "react";
import { Button, Carousel, Image, Space, Table, Tabs } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";

import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal , { } from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT, GET_PRODUCTS } from "../../../api/products";

const ListProduct = () => {
  const {data: products} = useQuery(GET_PRODUCTS)

  const [removeProduct] = useMutation(DELETE_PRODUCT)
  
  const columns: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      // sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "imageType",
      render: (_, record) => (
        <div className="flex items-center">
          <Image
            className="rounded-3xl "
            width={100}
            height={100}
            src={record?.image}
          />
          <div className="ml-3 text-gray-500">
            <p>{record?.name}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Mô tả",
      dataIndex: "decription",
      key: "decription",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/admin/product/edit/${record?.key}`}>
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

  const data = products?.products?.map((item: any) => ({
    key: item?.id,
    id: item?.id,
    name: item?.name,
    price: item?.price,
    image: item?.image,
    decription: item?.decription,
    category: item?.category?.name,
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
            removeProduct({ variables: { id: id }, refetchQueries: [{ query: GET_PRODUCTS }] })
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
        scroll={{x : true}}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default ListProduct;
