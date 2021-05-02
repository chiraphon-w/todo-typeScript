import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TodoFormProps } from '@/components/types/index';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, searchTodo, type }) => {
  const [form] = Form.useForm();

  const onHandleAdd = (values: { title: string }) => {
    if (!!addTodo){
      addTodo(values.title);
    } 
    form.resetFields();
  };

  const onHandleSearch = (values: { title: string }) => {
    if (!!searchTodo) searchTodo(values.title);
  };

  return (
    <>
      <Form
        onFinish={type === 'add' ? onHandleAdd : onHandleSearch}
        form={form}
        layout='inline'
      >
        <Form.Item
          label={type === 'add' ? 'ADD TODO' : 'SEARCH TODO'}
          name='title'
          rules={
            type === 'add'
              ? [{ required: true, message: 'Please Enter Text' }]
              : [{ required: false }]
          }
        >
          <Input placeholder='Enter text' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            {type === 'add' ? 'ADD' : 'SEARCH'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TodoForm;
