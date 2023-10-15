import React, { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Select,
  message,
  Breadcrumb,
  Typography,
  InputNumber,
  Switch,
  Checkbox,
  Row,
  Col,
  Rate,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../../api/category";
import { CREATE_PRODUCT, GET_PRODUCTS } from "../../../api/products";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddProduct = () => {
  const { data: category } = useQuery(GET_CATEGORIES);

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    context: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoidXNlcjVAZ21haWwuY29tIiwiaWF0IjoxNjk1MjkyNDY5LCJleHAiOjE2OTUzNzg4Njl9.nvkAtsgUngbchskjqNOvVcf_FPVKn5EOtgdqxPzpvew`,
      },
    }
  })
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // console.log(values);
    try {
       await createProduct({
        variables: {
          createProductInput: {
            name: values?.name,
            price: values?.price,
            image: "https://picsum.photos/200/300",
            categoryId: values?.categoryId,
            decription: values?.decription,
          },
        },
        refetchQueries: [{ query: GET_PRODUCTS }],
      })
      // if(response?.data ){
      //   message.success("Thêm mới thành công!")
      // }
      setTimeout(() => {navigate(`/admin/product`)}, 1000);
      
    } catch (error) {
      console.log(error);
    }
  };








  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const [fileList, setFileList] = useState([]);
  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handleBeforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Kích thước hình ảnh không được vượt quá 10MB!");
    }
    return isJpgOrPng && isLt10M;
  };
  const handleOnChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <div>
      <div className="max-w-[80%] mr-auto m-10">
        <div className="mb-5">
          <Title level={3}>Thêm mới</Title>
        </div>

        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            "input-number": 1,
          }}
          style={{ maxWidth: 1000 }}
          className="grid grid-cols-1 xl:grid-cols-2"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: "Vui lòng nhập giá của sản phẩm" },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên ảnh!" }]}
          >
            <Upload
              name="avatar"
              beforeUpload={handleBeforeUpload}
              customRequest={dummyRequest}
              onChange={handleOnChange}
              listType="picture"
              maxCount={4}
              fileList={fileList}
              multiple
            >
              {fileList.length === 4 ? (
                ""
              ) : (
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Danh mục"
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập loại sản phẩm!" },
            ]}
          >
            <Select placeholder="Vui lòng nhập loại phòng!">
              {category?.categories?.map((item: any) => (
                <Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="decription" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button
                className="flex items-center w-30 bg-[rgb(76,167,68)]  py-5 rounded-3xl hover:bg-sky-500"
                type="default"
                htmlType="submit"
              >
                <AiOutlineCheck className="text-[#fff] " />
                <Text className=" text-[#fff] ml-2">Thêm</Text>
              </Button>
              <Button
                className="flex items-center max-w-30 bg-[rgb(119,145,115)]  py-5 rounded-3xl hover:bg-indigo-400"
                htmlType="reset"
              >
                <BiReset className="text-[#fff]" />
                <Text className="text-[#fff] ml-3">Làm mới</Text>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
