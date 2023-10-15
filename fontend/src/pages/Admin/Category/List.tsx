import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CATEGORY, GET_CATEGORIES } from "../../../api/category";

const ListCategory = () => {
  const { loading, error, data: category } = useQuery(GET_CATEGORIES);

  const [removeCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      sortDirections: ["descend"],
      // sorter: (a, b) => a.id.length - b.id.length,
      fixed: "left",
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/admin/category/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          {record?.id === 1 ? (
            ""
          ) : (
            <Button
              onClick={() => remove(record?.id)}
              type="primary"
              style={{ backgroundColor: "#e23428" }}
            >
              <MdDeleteForever />
            </Button>
          )}
        </Space>
      ),
      // fixed: "right",
    },
  ];

  const data = category?.categories?.map((item: any) => ({
    key: item?.id,
    id: item?.id,
    name: item?.name,
  }));

  const remove = (id: any) => {
    try {
      swal({
        title: "Bạn có muốn xóa không ?",
        text: "Bạn không thể hoàn tác sau khi xóa!",
        icon: "warning",
        buttons: ["Trở lại", "Xóa"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            removeCategory({ variables: { id: id } });
            swal("Bạn đã xóa thành công", {
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
            <Link to={`/admin/category/add`}>Thêm loại sản phẩm</Link>
          </Button>
          <Button
            className="bg-red-400	text-[#fff] hover:drop-shadow-2xl mb-2 md:ml-4"
            type="default"
            icon={<MdOutlineDeleteOutline />}
          >
            <Link to={`/admin/category`}>Thùng rác</Link>
          </Button>
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default ListCategory;
