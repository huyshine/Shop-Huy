import React, { useState } from "react";
import { Button, Image, Space, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_FEEDBACKS, GET_FEEDBACKS } from "../../../api/feedback";
import { Rate } from "antd";
const ListFeedBack = () => {
  const { data: feedbacks } = useQuery(GET_FEEDBACKS);

  const data = feedbacks?.productReviews?.map((item: any) => {
    return {
      key: item?.id,
      id: item?.id,
      product: item?.product,
      user: item?.user,
      ...item,
    };
  });

  const [removeProductReview] = useMutation(DELETE_FEEDBACKS);

  const columns: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      // sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <div className="flex items-center">
          <Image
            className="rounded-3xl "
            width={100}
            height={100}
            src={product?.image}
          />
          <div className="ml-3 text-gray-500">
            <p>{product?.name}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Email khách hàng",
      dataIndex: "user",
      key: "user",
      render: (user) => <p>{user?.email}</p>,
    },
    {
      title: "Đánh giá sao",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
          <Rate  defaultValue={rating}/>
      ),
    },
    {
      title: "Nội dung đánh giá",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => remove(record?.id)}
            type="primary"
            style={{ backgroundColor: "#e23428" }}
          >
            <MdDeleteForever />
          </Button>
        </Space>
      ),
    },
  ];

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
            // removeComment(id);
            removeProductReview({
              variables: { id: id },
              refetchQueries: [{ query: GET_FEEDBACKS }],
            });
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
      />
    </div>
  );
};

export default ListFeedBack;
