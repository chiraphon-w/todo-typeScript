import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TodoFormProps } from '@/components/types/index';
import { useRecoilState } from 'recoil';
import { clearSearchState } from './recoil/atom';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, searchTodo, type }) => {
  const [form] = Form.useForm();
  const [clearSearch, setClearSearch] = useRecoilState(clearSearchState);

  const onHandleAdd = (values: { title: string }) => {
    if (!!addTodo) {
      addTodo(values.title);
    }
    form.resetFields();
  };

  useEffect(() => {
    form.resetFields();
  }, [clearSearch]);

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
          {type === 'add' ? (
            <Button htmlType='submit' type='primary'>
              ADD
            </Button>
          ) : (
            <Button htmlType='submit' type='primary' icon={<SearchOutlined />}>
              SEARCH
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default TodoForm;
