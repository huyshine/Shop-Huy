import React, { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  message,
  Typography,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CREATE_POST, GET_POSTS } from "../../../api/post";

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddPost = () => {

  const [createPost] = useMutation(CREATE_POST)
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // console.log(values);
    try {
       await createPost({
        variables: {
          createPostInput: {
            title: values?.title,
            content: values?.content,
            image: "https://inhinhonline.com/uploads/w900/2023/02/15/tranh-treo-tuong-quan-tra-sua.jpg",
          },
        },
        refetchQueries: [{ query: GET_POSTS }],
      })
      // if(response?.data ){
      //   message.success("Thêm mới thành công!")
      // }
      setTimeout(() => {navigate(`/admin/post`)}, 1000);
      
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
          className="grid grid-cols-1"
        >
          <Form.Item
            label="Tiêu đề bài viết"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết!" }]}
          >
            <Input />
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


          <Form.Item name="content" label="Mô tả">
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

export default AddPost;
