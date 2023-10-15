import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY, GET_CATEGORIES } from '../../../api/category';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [createCategory ,{data}]  = useMutation(CREATE_CATEGORY)
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await createCategory({
        variables: {
          createCategoryInput: {
            name: values.name,
          },
        },
        refetchQueries: [{ query: GET_CATEGORIES}]
      });
      if(response.data){
        navigate('/admin/category')
      }  
    } catch (error) {
      console.error(error);
    }

  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
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
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button danger htmlType="submit">
        Thêm mới
      </Button>
    </Form.Item>
  </Form>
  )
}

export default AddCategory