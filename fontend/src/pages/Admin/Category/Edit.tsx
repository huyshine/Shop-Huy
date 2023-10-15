import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_CATEGORY, UPDATE_CATEGORY } from "../../../api/category";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input } from "antd";

const EditCategory = () => {
  const { id }: any = useParams();
  const parsedId = parseInt(id);
  const { data } = useQuery(GET_CATEGORY, { variables: { id: parsedId } || ""});
  // console.log(data, "data");

  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    // console.log(data?.category?.name, "data");
    // const { data } = useQuery(GET_CATEGORY, { variables: { id: parsedId } });
    if(data){
    form.setFieldsValue({
      id: data?.category?.id,
      name: data?.category?.name,
    });
    }
  }, [data]);

  const onFinish = async (values: any) => {
    try {
      const response = await updateCategory({
        variables: {
          updateCategoryInput: {
            id: data?.category?.id,
            name: values.name,
          },
        },
        refetchQueries: [{ query: GET_CATEGORY }],
      });
      if (response?.data) {
        navigate("/admin/category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button danger htmlType="submit">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCategory;
